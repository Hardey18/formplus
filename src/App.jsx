import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTemplate } from '../src/slices/template'
import './App.css'

function App() {

  const templates = useSelector(state => state.templates);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTemplate());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  console.log("Templates", templates);

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  )
}

export default App
