<h1 align="center">Ready-to-build React quiz DApp.</h1>
DApp stores all the results on-chain all players can mint a reward token.
The more score you get, the more tokens you mint!

<h2 align="center">Complete detailed guide on how to build and deploy Aleo DApp</h2>
<h3 align="center">This DApp online: https://aleo.org/discord</h3>


## table of content
  - [how to deploy this DApp on your domain in a few minutes](#how-to-deploy-this-DApp-on-your-domain-in-a-few-minutes)
  - [editing questions](#editing-questions)
  - [versions of the program (smart contract) for mint and storage of rewards](#versions-of-the-program-for-mint-and-storage-of-rewards)
  - [connecting Leo Wallet](#connecting-Leo-Wallet)
  - [reward minting with Leo Wallet](#reward-minting-with-Leo-Wallet)
  - [how to install locally](#how-to-install-locally)
 
## how to deploy this DApp on your domain in a few minutes
If you already have a domain, great! You can redirect DApp to your domain with a few clicks.
If not, then we can use a free and highly convenient https://vercel.com/


So let's go:
  - we need to register here: https://vercel.com/
  - make a fork of this page https://github.com/liolikus/QuizGame
  - connect GitHub to our Vercel account https://vercel.com/account/login-connections
  - create new Vercel project ![image](https://github.com/liolikus/QuizGame/assets/85246338/995f4308-336e-4260-8107-c2f555afe02b)
  - choose our forked repo ![image](https://github.com/liolikus/QuizGame/assets/85246338/639f016a-4ed2-43dd-a223-fd5064b841aa)
  - add title, click Deploy ![image](https://github.com/liolikus/QuizGame/assets/85246338/59732ffa-3c37-4342-9d77-cfde1611eea4)
  - wait till Vercel builds our DApp ![image](https://github.com/liolikus/QuizGame/assets/85246338/f9303bda-7692-4ac3-8b0b-ad952b4a139a)
 
 **Congrats! We just build an ready-to-use onchain DApp for a few minutes!**

## editing questions
If you want to edit the questions in your DApp, your file with questions would be located [here](https://github.com/liolikus/QuizGame/blob/main/src/Game/randomdata.ts) but don't forget to change the GitHub username to yours, in order to edit:
```tsx
{
    id: Math.random(),
    question: "2u32 + 2u32 =", // Question
    correctAnswer: "4u32",     // Right answer
    wrongAnswers: [
      "2u64",                   // Wrong answer
      "4u64",                   // Wrong answer
      "2u32"                    // Wrong answer
    ]
  },
```

## versions of the program for mint and storage of rewards
For this DApp deployed a pretty simple Program, which allows to mint but does not allow to transfer the reward.
The Program store our `result` (amount as `u64`) and reward `owner` (as `address`). 
This ready-to-deploy Program can be found [here](https://github.com/liolikus/quiz_token)

How to deploy not just the "Hello World" programs you can find in my [medium](https://medium.com/@alex.brunko)

If, in addition to the `owner` and `result`, you want to store, e.g., the participant's discord `username` **"the_liolik#3786"**, you can use this ready-to-deploy [Program](https://github.com/liolikus/quiz_token_with_username)

output sample for `quiz_token_with_username.aleo`:
```
          • {
           owner: aleo1xvlh6eyf5lgfv2z5za47j6qkh3uv5e0ga6gdzg5l4rssheymxsqqsnkgc4.private,
           gates: 0u64.private,
           discord_username: 604423837765371544759072838070515766field.private,
           amount: 101u64.private,
           _nonce: 4114874251515989834421702505041058013293543730216157692419564769394314805954group.public
         }
```
Where `discord_username` storing as a `field` type.
Converting `discord_username` steps:
  - integer number `604423837765371544759072838070515766` > encrypted Base58 `4Fte3TYDESFwQoFSitC13`
  - encrypted Base58 `4Fte3TYDESFwQoFSitC13` > decrypted Base58 `the_liolik#3786`

## connecting Leo Wallet
Complete documentation about the Leo Wallet connection can be found [here](https://github.com/demox-labs/aleo-wallet-adapter)

**Many thanks to [demox-labs](https://github.com/demox-labs) Team!**

Install dependencies
```
npm install --save \
    @demox-labs/aleo-wallet-adapter-base \
    @demox-labs/aleo-wallet-adapter-react \
    @demox-labs/aleo-wallet-adapter-reactui \
    @demox-labs/aleo-wallet-adapter-leo \
    react
```
The Leo Wallet connection example can be found [here](https://github.com/liolikus/QuizGame/blob/main/src/App.tsx)

For easy editing **WalletMultiButton** separate `<Navbar/>` [component](https://github.com/liolikus/QuizGame/tree/main/src/Game/pages/quizGame/components/navbar) and `navbar.css` file were created.

`<Navbar/>` component built-in in [Header](https://github.com/liolikus/QuizGame/blob/main/src/Game/pages/quizGame/components/header/Header.tsx)
```tsx
    <>
      <div className="header">
      <Navbar/>
        <span className="score">Points: {score}</span>
        <span className="index">Question {currentQuestionIndexShow} of {totalQuestions}</span>
        <span className="score" style={{marginTop: ".5rem"}}>{getLifeIcons(life)}</span>
      </div>
    </>
```
## reward minting with Leo Wallet
Now the Leo Wallet connected to our DApp and we can easy and safe interact with Aleo blockchain!
Complete integration code can be found [here](https://github.com/liolikus/QuizGame/blob/main/src/Game/pages/quizGame/components/result/Result.tsx)

Sample for the `mint` executing functions for the `quiz_token.aleo` Program:

>It seems that **with Leo Wallet 0.0.17+ no need to store our ProverKey**, but as for now, this part is still included in the code so the Program ProverKey >storing here: https://provers.s3.us-west-2.amazonaws.com/mint.prover , so this part of the guide will be updated in the future, but in any case, this code is >fully working.

  ```tsx
    const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const provingKeyUrl = 'https://provers.s3.us-west-2.amazonaws.com/mint.prover';
    const score = quizContext?.state.score
    const inputs = [publicKey, `${score}u64`];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      'quiz_token.aleo',
      'mint',
      inputs,
      provingKeyUrl
    );
  ```

## how to install locally
```
git clone https://github.com/liolikus/QuizGame && cd QuizGame
 ```
 ```
 yarn
 ```
 ```
 yarn start
 ```


## This guide in russian [(click_me)](https://github.com/liolikus/QuizGame/blob/main/README_RU.md)




