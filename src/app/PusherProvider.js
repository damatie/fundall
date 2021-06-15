import React from "react";

const PusherContext = React.createContext({});

const PusherProvider = ({ pusher, children }) => {
  return (
    <PusherContext.Provider value={{ pusher }}>
      {children}
    </PusherContext.Provider>
  );
}

export default PusherProvider;