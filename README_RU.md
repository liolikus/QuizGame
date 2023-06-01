<h1 align="center">Готовая к установке ончейн игра-квиз для Aleo.</h1>
Игра хранит результаты в блокчейне и в качестве награды игрок может сминтить специальные токены.
Награда рассчитывается исходя из логики: Чем больше знаешь, тем больше получаешь.

<h2 align="center">Детальный гайд по установке и разработке приложения на Aleo.</h2>
<h3 align="center">Посмотреть приложение онлайн: https://quiz.aleo.build/</h3>


## Содержание
  - [как развернуть это приложение на своём домене за несколько минут](#как-развернуть-это-приложение-на-бесплатном-домене-за-несколько-минут)
  - [редактируем вопросы в приложении](#редактируем-вопросы-в-приложении)
  - [деплой разных вариантов программы для минта и хранения ревардов](#деплой-разных-вариантов-программы-для-минта-и-хранения-ревардов)
  - [подключаем Leo Wallet](#подключаем-leo-wallet)
  - [минтим награду используя Leo Wallet](#минтим-награду-используя-leo-wallet)
  - [как развернуть приложение локально](#как-развернуть-приложение-локально)
 
## Как развернуть это приложение на бесплатном домене за несколько минут
Если у вас уже есть домен - отлично!
Если нет, то мы можем воспользоваться бесплатным и крайне удобным сервисом https://vercel.com/

Итак, по порядку:
  - регестрируемся на сайте https://vercel.com/
  - делаем форк этой страницы https://github.com/liolikus/QuizGame
  - подключаем GitHub к нашему аккаунту Vercel https://vercel.com/account/login-connections
  - создаём в Vercel новый проект ![image](https://github.com/liolikus/QuizGame/assets/85246338/995f4308-336e-4260-8107-c2f555afe02b)
  - выбираем наш форкнутый репозиторий ![image](https://github.com/liolikus/QuizGame/assets/85246338/639f016a-4ed2-43dd-a223-fd5064b841aa)
  - пишем название, нажимаем Deploy ![image](https://github.com/liolikus/QuizGame/assets/85246338/59732ffa-3c37-4342-9d77-cfde1611eea4)
  - ждём пока Vercel автоматически задеплоит наше приложение ![image](https://github.com/liolikus/QuizGame/assets/85246338/f9303bda-7692-4ac3-8b0b-ad952b4a139a)
 
 **Поздравляю! Каких-то 10-20-30 минут у вас есть готовое для использования приложение!**

Если вы хотите изменить вопросы в вашем приложении, то просто переходите [сюда](https://github.com/liolikus/QuizGame/blob/main/src/Game/randomdata.ts) не забывая изменить имя пользователя GitHub на своё, где вы можете отредактировать все вопросы, на те, которые вам нужны, например:
```tsx
{
    id: Math.random(),
    question: "2u32 + 2u32 =", // Вопрос
    correctAnswer: "4u32",     // Правильный ответ
    wrongAnswers: [
      "2u64",                   // Неправильный ответ
      "4u64",                   // Неправильный ответ
      "2u32"                    // Неправильный ответ
    ]
  },
```

## редактируем вопросы в приложении
Если вы хотите изменить вопросы в вашем приложении, то просто переходите [сюда](https://github.com/liolikus/QuizGame/blob/main/src/Game/randomdata.ts) не забывая изменить имя пользователя GitHub на своё, где вы можете отредактировать все вопросы, на те, которые вам нужны, например:
```tsx
{
    id: Math.random(),
    question: "2u32 + 2u32 =", // Вопрос
    correctAnswer: "4u32",     // Правильный ответ
    wrongAnswers: [
      "2u64",                  // Неправильный ответ
      "4u64",                  // Неправильный ответ
      "2u32"                   // Неправильный ответ
    ]
  },
```
## деплой разных вариантов программы для минта и хранения ревардов
Для данного приложения задеплоен простой контракт, без возможности передачи награды.
Контракт хранит ваш результат (u64) и ваш адрес.
Пример такого контракта можно найти [тут](https://github.com/liolikus/quiz_token)

Если, помимо адреса и результата, вы хотите сохранять, например, ещё дискорд участника **"the_liolik#3786"**, то для этого вы можете использовать такой [контракт](https://github.com/liolikus/quiz_token_with_username)

Как деплоить кастомные контракты, а не просто "Hello World" программы можно найти у меня в [medium](https://medium.com/@alex.brunko)
## подключаем Leo Wallet
Полное руководство по подключению Leo Wallet к вашему приложению вы можете изучить [тут](https://github.com/demox-labs/aleo-wallet-adapter)

Огромное за это спасибо потрясающим ребятам из [demox-labs](https://github.com/demox-labs)!

Устанавливаем зависимости командой
```
npm install --save \
    @demox-labs/aleo-wallet-adapter-base \
    @demox-labs/aleo-wallet-adapter-react \
    @demox-labs/aleo-wallet-adapter-reactui \
    @demox-labs/aleo-wallet-adapter-leo \
    react
```
Пример реализации для данного приложения находится [здесь](https://github.com/liolikus/QuizGame/blob/main/src/App.tsx)

Для удобства редактирования **WalletMultiButton** был создан отдельный [компонент](https://github.com/liolikus/QuizGame/tree/main/src/Game/pages/quizGame/components/navbar) и .css файл для удобства редактирования.

Компонент, в свою очередь содержится в [App.tsx](https://github.com/liolikus/QuizGame/blob/main/src/App.tsx)
```tsx
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
                                                                                              <Navbar/>
                                                                                  <QuizCore/>
                                                                           </QuizProvider>
                                                                             }
                                                                   >
                                                          </Route>
                                               </Routes>
                                      </UniversalProvider>
               </WalletModalProvider>
  </WalletProvider>
```
## минтим награду используя Leo Wallet
После подключения Leo Wallet наше приложение способно безопасно и удобно взаимодействовать с блокчейном Aleo.
Полный код страницы можно посмотреть [тут](https://github.com/liolikus/QuizGame/blob/main/src/Game/pages/quizGame/components/result/Result.tsx)

Непосредственно вызов функции `mint` для программы `quiz_token.aleo` выглядит так:
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
Не забываем, что для каждой функции нам необходимо хранить наш **ProverKey**, в данном случае это https://provers.s3.us-west-2.amazonaws.com/mint.prover соответсвенно, обращаем максимальное внимание на права доступа для этого файла.

## как развернуть приложение локально
```
git clone https://github.com/liolikus/QuizGame && cd QuizGame
 ```
 ```
 yarn
 ```
 ```
 yarn start
 ```

