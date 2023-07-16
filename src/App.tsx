import React, { ChangeEvent, useState, useRef } from 'react';
import { searchBy } from './services/api';
import './App.css';
import Spinner from './components/Spinner';
import { ListItem, SearchResponse } from './interfaces';

const  App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [listItems, setListItems] = useState<SearchResponse[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [disconnected, setDisconnected] = useState<boolean>(false);
  const [notFound, setNotFound] = React.useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout | "">("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>):void => {
    // Remove previous timeout from previous callbacks
    clearTimeout(timeout.current);
    setNotFound(false);
    setValue(e.target.value)

    if(!inputRef.current?.value.trim()){
      setListItems([]);
      return;
    }

    timeout.current = setTimeout(async () => {
        setDisabled(true);
        const searchTerm = inputRef.current?.value;
        const matches = await searchBy(searchTerm, disconnected);
        
        if(matches?.length){
          setListItems(matches)
        } else {
          setNotFound(true)
        }
      
      setDisabled(false);
    }, 1000)
  };

  const handleSelection = (item: ListItem) => {
    setValue(item["name"]);
    setListItems([]);
  }

  return (
    <div className="layout">
      <div>
        {!disconnected && <p>Increase the number of times the API fails</p>}
        {disconnected && <p>Return to normal functionality</p>}
        <button 
          className={disconnected ? "connected"  : "disconnected"} 
          onClick={() => setDisconnected(!disconnected)}>{disconnected ? "Connect": "Disconnect"}
        </button>
      </div>
      <div className='wrapper'>
        <div className='autocomplete'>
          <input 
            value={value} 
            onChange={handleSearch} 
            ref={inputRef} 
            disabled={disabled}
            placeholder='Search for names'
            />
          {notFound && <div className='not-found'>Results not found for {value}</div>}
          {disabled && <Spinner/>}
          <div className='autocomplete-items'>
              {listItems.map(({item, index}) => {
                return (
                  <div key={item._id} onClick={() => handleSelection(item)}>
                    {item["name"].split("").map((l, idx) => {
                      const matchedCharacter = (idx >= index && idx < (index + value.length))  ? "match": ""
                      return <span key={idx} className={matchedCharacter}>{l}</span>
                    })}
                  </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
