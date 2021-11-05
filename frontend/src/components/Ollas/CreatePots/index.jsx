import React, { useState } from "react";
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@material-ui/icons/";

import { useToasts } from "react-toast-notifications";

import Spinner from "../../UI/Spinner";
import classes from "./CreatePots.module.scss";
import fetchController from "../../../Networking/fetch-controller";
import TYPE from "../../../Networking/requestTypes";
import AutocompleteInput from "../../AutocompleteInput";

const CreatePots = () => {
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    address: "",
    potName: "",
    description: "",
    fromTimeFirst: "",
    fromTimeSecond: "",
    toTimeFirst: "",
    toTimeSecond: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const updateFormData = (event) => {
    const value = event.target.value;
    const inputId = event.target.id;
    setFormData((prevState) => ({ ...prevState, [inputId]: value }));
    //event.current.length
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const {
      address,
      potName,
      description,
      fromTimeFirst,
      fromTimeSecond,
      toTimeFirst,
      toTimeSecond,
      image,
    } = formData;

    if (localStorage.getItem("userIdentifier")) {
      setLoading(true);
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("userIdentifier");
      const fromTime = `${fromTimeFirst}:${fromTimeSecond}`;
      const toTime = `${toTimeFirst}:${toTimeSecond}`;

      const response = await fetchController(
        TYPE.ADD_POT,
        {
          email,
          address,
          potName,
          description,
          latlng: 1,
          image,
          from: fromTime,
          to: toTime,
        },
        { token }
      );

      if (response.status === 200) {
        setLoading(false);
        addToast("Olla Popular guardada correctamente.", {
          appearance: "success",
          autoDismiss: "10000",
        });
      }
    } else {
      setLoading(false);
      return addToast("Inicie sesión para continuar", {
        appearance: "error",
        autoDismiss: "4000",
      });
    }
  };

  return (
    <form className={classes["pots-form"]} onSubmit={submitHandler}>
      {loading && <Spinner />}
      <div className={classes["input-and-icon"]}>
        <LocationOnIcon />
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            componentRestrictions: {
              country: ["uy"],
            },
          }}
          selectProps={{
            className: classes["input-pots-icon"],
            placeholder: "Ingrese diección de la olla",
            type: "text",
            id: "address",
            onChange: setAddress,
          }}
          apiKey=""
        />
      </div>
      <input
        className={classes["input-pots"]}
        type="text"
        placeholder="Nombre"
        onChange={updateFormData}
        id="potName"
        required
      />
      <input
        className={classes["input-pots"]}
        type="text"
        placeholder="Descripción"
        onChange={updateFormData}
        id="description"
        required
      />
      <div className={classes["uploader-container"]}>
        <FileUploader
          classes={classes["drag-area"]}
          handleChange={handleChange}
          children={
            <p>
              <div className={classes["upload-icon"]}>
                <ArrowUpwardIcon />
              </div>{" "}
              {file != null ? (
                <p className={classes["upload-text"]}>Imagen subida correctamente</p>
              ) : (
                <p className={classes["upload-text"]}>
                  <b>Seleccioná</b> una imagen para tu olla 
                </p>
              )}
            </p>
          }
          name="file"
          hoverTitle="Suelta tu archivo aqui"
        />
      </div>
      <div className={classes["schedule-and-button"]}>
        <div className={classes.schedule}>
          <div className={classes["start-schedule"]}>
            <p>Horario de apertura:</p>
            <div className={classes["start-inputs"]}>
              <input
                className={classes["input-schedule"]}
                placeholder="Hora"
                min="0"
                max="24"
                type="number"
                id="fromTimeFirst"
                onChange={updateFormData}
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes["input-schedule"]}
                placeholder="Minutos"
                min="0"
                max="60"
                type="number"
                id="fromTimeSecond"
                onChange={updateFormData}
                required
              />
            </div>
          </div>

          <div className={classes["end-schedule"]}>
            <p>Horario de cierre:</p>
            <div className={classes["end-inputs"]}>
              <input
                className={classes["input-schedule"]}
                placeholder="Hora"
                min="0"
                max="24"
                type="number"
                id="toTimeFirst"
                onChange={updateFormData}
                required
              />
              <span className={classes.separation}> : </span>
              <input
                className={classes["input-schedule"]}
                placeholder="Minutos"
                min="0"
                max="60"
                type="number"
                id="toTimeSecond"
                onChange={updateFormData}
                required
              />
            </div>
          </div>
        </div>
        <button className={classes["add-button"]} type="submit">
          <AddIcon />
          Agregar
        </button>
      </div>
    </form>
  );
};
export default CreatePots;
