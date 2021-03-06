import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoint from "../../endpoints.config";

//Hooks
import useAttributes from "./hooks/useAttributes";

//Interfaces
import {
  CharacterInterface,
  StatEditAction,
} from "./interfaces/CharacterInterfaces";

//Styling
import { Header, RegularText } from "../../styled/styled";

const Character: React.FC<CharacterInterface> = ({ _id, ...attributes }) => {
  const [updateShows, setUpdateShows] = useState<boolean>(false); //To prevent unneeded update requests
  const { charName, str, agi, int, charClass } = useAttributes({
    ...attributes,
    _id,
  });
  /*The useAttributes hook is for converting character attributes into a useReducer state
 that allows an attribute to be edited through a dynamic input field before being updated
 to the server*/
  const character: CharacterInterface = {
    name: charName.state.value,
    strength: str.state.value,
    agility: agi.state.value,
    intelligence: int.state.value,
    charClass: charClass.state.value,
    _id: _id,
  };

  useEffect(() => {}, []);

  const deleteChar = (charId: string) => {
    try {
      axios.delete(endpoint.deleteChar, {
        data: { id: charId },
      });
      console.log(charId + " deleted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const updateChar = (character: CharacterInterface) => {
    console.log(character);
    try {
      axios.put(endpoint.updateChar, character);
      console.log(character._id + " updated");
    } catch (err) {
      console.log(err);
    }
  };
  const dispatchOnEvent = (dispatch: React.Dispatch<StatEditAction>) => {
    dispatch({ type: "editOn", dispatch: dispatch });
  };

  return (
    <div data-testid={`character-${_id}`}>
      <Header
        data-testid={`character-${_id}-stat`}
        onClick={() => {
          dispatchOnEvent(charName.dispatch);
        }}
      >
        {charName.state.renderStatEditor}
      </Header>
      <RegularText
        data-testid={`character-${_id}-stat`}
        onClick={() => {
          dispatchOnEvent(str.dispatch);
        }}
      >
        Strength:{str.state.renderStatEditor}
      </RegularText>
      <RegularText
        data-testid={`character-${_id}-stat`}
        onClick={() => {
          dispatchOnEvent(agi.dispatch);
        }}
      >
        Agility:{agi.state.renderStatEditor}
      </RegularText>
      <RegularText
        data-testid={`character-${_id}-stat`}
        onClick={() => {
          dispatchOnEvent(int.dispatch);
        }}
      >
        Intelligence:{int.state.renderStatEditor}
      </RegularText>
      <RegularText
        data-testid={`character-${_id}-stat`}
        m={"0 0 60px 0"}
        onClick={() => {
          dispatchOnEvent(charClass.dispatch);
        }}
      >
        Class:{charClass.state.renderStatEditor}
      </RegularText>
      <button onClick={() => deleteChar(_id)}>Delete {_id}</button>
      <button onClick={() => updateChar(character)}>Update</button>
    </div>
  );
};

export default Character;
