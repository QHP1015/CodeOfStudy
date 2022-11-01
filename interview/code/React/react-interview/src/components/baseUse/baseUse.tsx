import React, { ReactEventHandler, useState } from "react";

export const BaseUse: React.FC = () => {
  const [name, setName] = useState("qhp");

  const clickHandler1 = () => {
    name === "qhp" ? setName("syj") : setName("qhp");
  };
  const clickHandler2 = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("target", event.target);
    console.log("current-target", event.currentTarget);
    console.log("event", event);
    console.log("native-event", event.nativeEvent);
    console.log("native-event-target", event.nativeEvent.target);
    console.log("native-event-current-target", event.nativeEvent.currentTarget);
  };
  return (
    <>
      <h2 onClick={clickHandler1}>{name}</h2>

      <a href='https://www.baidu.com' onClick={clickHandler2}>
        click me
      </a>
    </>
  );
};
