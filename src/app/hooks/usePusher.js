import React from "react";

const PusherContext = React.createContext({});

const usePusher = () => {
    const context = React.useContext(PusherContext);
    if (!context) {
      throw new Error("usePusher must be used within a PusherProvider");
    }
  
    const { pusher } = context;
    return pusher;
}
export default usePusher;