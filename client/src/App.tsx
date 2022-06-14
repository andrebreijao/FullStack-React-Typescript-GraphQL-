import React from "react";
import "./App.scss";
import { client } from "./config/client-graphql";
import Planets from "./pages/planets/Planets";
import Characters from "./pages/characters/Characters";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TemplateContextProvider } from "./context/TemplateContext";
const App = () => {
  return (
    <ApolloProvider client={client}>
      <TemplateContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Planets />}></Route>
            <Route path="/characters" element={<Characters />} />
          </Routes>
        </BrowserRouter>
      </TemplateContextProvider>
    </ApolloProvider>
  );
};

export default App;
