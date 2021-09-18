import React, { useReducer, useEffect } from "react";
import CharacterInterface from "../../interfaces/CharacterInterface";
import { Header, RegularText } from "../../styled/styled";
import axios from "axios";

interface AttributeState {
  value: number | string;
  renderEditComponent: HTMLInputElement;
  clicked: boolean;
}

interface ReducerAction {
  type: string;
  payload: number;
}

const Character: React.FC<CharacterInterface> = ({
  agility,
  charClass,
  intelligence,
  name,
  strength,
  _id,
}) => {
  const initialState = (attribute: number | string) => {
    return {
      value: attribute,
      renderEditComponent: <span>{attribute}</span>,
      clicked: false,
    };
  };
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "unclicked":
        console.log(state);
        return {
          ...state,
          renderEditComponent: (
            <input
              onChange={(e) => {
                const valueIsString = typeof state.value === "string";
                const whatUserTyped = e.target.value;
                const typedAnEmptyString = whatUserTyped
                  ? whatUserTyped
                  : state.value;
                state.value = valueIsString
                  ? whatUserTyped
                  : Number(
                      isNaN(Number(whatUserTyped))
                        ? state.value
                        : typedAnEmptyString
                    );
              }}
              onBlur={async (e) => {
                console.log(state.value);
                action.dispatch({ type: "clicked", payload: state.value });
              }}
              onKeyUp={(e) => {
                e.keyCode === 13 && e.currentTarget.blur();
              }}
              onMouseOver={(e) => e.currentTarget.focus()}
              placeholder={`Changing '${state.value}'`}
            ></input>
          ),
        };
      case "clicked":
        return { ...state, renderEditComponent: <span>{action.payload}</span> };
    }
  };
  const [nameState, nameDispatch] = useReducer(reducer, initialState(name));
  const [strengthState, strengthDispatch] = useReducer(
    reducer,
    initialState(strength)
  );

  const deleteChar = (charId: string) => {
    try {
      axios.delete("http://localhost:3001/deleteChar", {
        data: { id: charId },
      });
      console.log(charId + " deleted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const dispatchOnEvent = (dispatch: React.Dispatch<any>) => {
    dispatch({ type: "unclicked", dispatch: dispatch });
  };

  return (
    <div>
      <Header
        onClick={() => {
          dispatchOnEvent(nameDispatch);
        }}
      >
        {nameState.renderEditComponent}
      </Header>
      <RegularText
        onClick={() => {
          dispatchOnEvent(strengthDispatch);
        }}
      >
        Strength:{strengthState?.renderEditComponent}
      </RegularText>
      <RegularText>Agility:{agility}</RegularText>
      <RegularText>Intelligence:{intelligence}</RegularText>
      <RegularText m={"0 0 60px 0"}>Class:{charClass}</RegularText>
      <button onClick={() => deleteChar(_id)}>Delete {_id}</button>
    </div>
  );
};

export default Character;
