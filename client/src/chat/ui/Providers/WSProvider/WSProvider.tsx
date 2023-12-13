import React, { FC, PropsWithChildren, createContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';

export interface WSContextScheme {
    io: Socket;
}

export const WSContext = createContext<WSContextScheme | null>(null);

// export const WSProvider: FC<PropsWithChildren> = (props) => {
//     const { children } = props;

//     useEffect(() => {}, []);

// return <WSContext.Provider value={data}>{children}</WSContext.Provider>;
// };
