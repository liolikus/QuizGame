import "./Game/pages/global.css"
import type { FC, ReactElement, } from "react"
import React, { useMemo } from "react";
import QuizCore from "./Game/pages/quizGame/index"
import ChooseTopic from "./Game/pages/chooseTopic/index"
import { QuizProvider } from "./Game/contexts/QuizContext"
import { UniversalProvider } from "./Game/contexts/UniversalContext"
import {
  Route,
  Routes
} from "react-router-dom";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
} from "@demox-labs/aleo-wallet-adapter-base";


const App:FC = ():ReactElement => {

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Aleo Quiz DApp',
      }),
    ],
    []
  );
 

  return (
    <>

<WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            autoConnect
          >
              <WalletModalProvider> 
                                    <UniversalProvider>
                                              <Routes>
                                                        <Route
                                                          path="/topic"
                                                          element={<ChooseTopic />}
                                                        >
                                                        </Route>
                                                          <Route
                                                            path="/"
                                                            element={
                                                                    <QuizProvider>
                                                                            <QuizCore/>
                                                                    </QuizProvider>
                                                            }
                                                          >
                                                          </Route>
                                              </Routes>
                                     </UniversalProvider>
              </WalletModalProvider>
  </WalletProvider>

    </>


  );
};
export default App;

