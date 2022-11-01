import React, { useRef, useState } from "react";

export const FormDemo: React.FC = () => {
  const [name, setName] = useState<string>("qhp");
  const [info, setInfo] = useState<string>("个人信息");
  const [city, setCity] = useState<string>("杭州");
  const [flag, setFlag] = useState<boolean>(true);
  const [gender, setGender] = useState<string>("male");

  const nameRef = useRef(null);
  const onInputChange = (e: React.BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  return (
    <>
      <div>
        <p>{name}</p>
        <label htmlFor='inputName' ref={nameRef}></label>
        <input id='inputName' value={name} onChange={onInputChange} type='text' />
      </div>
    </>
  );
};
