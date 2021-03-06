import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CharacterInterface } from "../../components/Character/interfaces/CharacterInterfaces";
import avatar from "../../assets/avatar.png";
import endpoint from "../../endpoints.config";

import {
  CharCreationContainer,
  CharCreationForm,
  AvatarContainer,
  AvatarImage,
  Button,
  LineBreak,
} from "./CharCreation-styled";
import { RegularText } from "../../styled/styled";

const CharCreation: React.FC = () => {
  const [name, setName] = useState("");
  const [str, setStr] = useState<string | number>(0);
  const [agi, setAgi] = useState<string | number>(0);
  const [int, setInt] = useState<string | number>(0);
  const [charClass, setCharClass] = useState("");
  const history = useHistory();
  const sendStatsToServer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<CharacterInterface>(endpoint.createChar, {
        name,
        str,
        agi,
        int,
        charClass,
      });
      await console.log(res.data);
      history.push("/all-characters");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CharCreationContainer data-testid="char-creation">
      <div>
        <RegularText>Level: 1</RegularText>
        <RegularText>Health: 44/44</RegularText>
        <RegularText>Experience: 134</RegularText>
        <RegularText>Next level at: 600</RegularText>
        <LineBreak />
      </div>
      <form onSubmit={(e) => sendStatsToServer(e)}>
        <label>Character Name</label>
        <input
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <AvatarContainer>
          <AvatarImage src={avatar} alt={"avatar"} />
        </AvatarContainer>
        <label>Strength</label>
        <input
          value={str || ""}
          onChange={(e) => {
            setStr(e.target.value);
          }}
        ></input>
        <br />
        <label>Agility</label>
        <input
          value={agi || ""}
          onChange={(e) => {
            setAgi(e.target.value);
          }}
        ></input>
        <br />
        <label>Intelligence</label>
        <input
          value={int || ""}
          onChange={(e) => {
            setInt(e.target.value);
            console.log(int);
          }}
        ></input>
        <br />
        <label>Class</label>
        <input
          value={charClass || ""}
          onChange={(e) => {
            setCharClass(e.target.value);
          }}
        ></input>
        <br />
        <Button w={"auto"} type="submit">
          Submit
        </Button>
      </form>
      <div>
        <Button>+</Button>
      </div>
    </CharCreationContainer>
  );
};

export default CharCreation;
