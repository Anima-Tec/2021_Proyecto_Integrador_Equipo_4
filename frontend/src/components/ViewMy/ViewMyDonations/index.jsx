import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useToasts } from 'react-toast-notifications';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import NotFound from './NotFound';
import fetchController from '../../../Networking/fetch-controller';
import TYPE from '../../../Networking/requestTypes';
import classes from './ViewMyDonations.module.scss';

const ViewMyDonations = () => {
  const { addToast } = useToasts();
  const [donations, setDonations] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getDonations = useCallback(
    async (page) => {
      if (localStorage.getItem('userIdentifier')) {
        const token = localStorage.getItem('userIdentifier');
        const response = await fetchController(
          TYPE.VIEW_MY_DONATIONS,
          {
            offset: page,
          },
          { token }
        );

        setDonations(response.data.Donations);
        setPageCount(response.data.PagesLeft + 1 + page);
      } else {
        addToast('Debe loguearse para ver sus donaciones.', {
          appearance: 'error',
          autoDismiss: '4000',
        });
      }
    },
    [addToast]
  );

  useEffect(() => {
    getDonations(0);
  }, [getDonations]);

  const handlePageClick = (newValue) => {
    getDonations(newValue.selected);
  };

  return donations.length ? (
    <>
      <div className={classes['table-container']}>
        <Table>
          <Thead className={classes['table-head']}>
            <Tr>
              <Th className={classes['radius_left-top']}>
                {' '}
                Tipo de donación:{' '}
              </Th>
              <Th className={classes['space']}></Th>
              <Th> Olla popular:</Th>
              <Th> Fecha:</Th>
              <Th className={classes['radius_right-top']}> Dueño de olla: </Th>
            </Tr>
          </Thead>
          <Tbody className={classes['table-body']} >
            {donations.map((donation) => (
              <Tr key={donation.id}>
                {donation.donationType === 'Money' && <Td>Dinero</Td>}
                {donation.donationType === 'Food' && <Td>Productos</Td>}
                <Td>{donation.potName} </Td>
                <Td>{donation.created_at.slice(0, 10)}</Td>
                <Td>{donation.ownerEmail}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className={classes['pagination-container']}>
          <ReactPaginate
            pageCount={pageCount}
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            onPageChange={handlePageClick}
            containerClassName={classes['pagination-container']}
            pageClassName={classes.page}
            breakClassName={classes.page}
            previousClassName={classes.page}
            nextClassName={classes.page}
            disabledClassName={classes.disabled}
            activeClassName={classes.active}
          />
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default ViewMyDonations;
