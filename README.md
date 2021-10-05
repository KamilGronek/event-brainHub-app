# Wprowadzenie:

Stworzyłem prosty formularz zaimplementowany w React'cie
i połączyłem z API napisanym w Node.js (Express.js), z wykorzystaniem Bazy MySQL.

## Technologie:

-React: 17.0.2,
-Node: 12.16.1,
-Express: 4.17.1

## Tworzenie bazy danych:

Należy skorzystać z klienta bazy danych MySQL serwer phpMyAdmin,
wejść na stronę : http://localhost/phpmyadmin/index.php,
następnie w polu do zapytań(queries) - SQL, należy wkleić kod zapisany w folderze serwer/database.sql

## Uruchomienie aplikacji dla back-end'u:

Po pobraniu aplikacji, aby uruchomić serwer, w głównej ścieżce projektu, należy wpisać:

```bash
cd server
```

następnie zainstalować zależności node.modules:

```bash
npm install
```

następnie aby uruchowmić serwer:

```bash
node server.js
```

## Uruchomienie aplikacji dla front-end'u:

Po uruchomienia aplikacji backendowej, aby uruchomić aplikacje frontendową, w nowym terminalu należy wpisać:

```bash
cd client
```

następnie zainstalować zależności node.modules:

```bash
npm install
```

następnie uruchomić aplikacje:

```bash
npm start
```

## Testy dla back-endu/ server:

Ścieżka gdzie znajdują się testy: server/test/app.test.js

Robimy kilka testów dla metody GET/POST a w niej m.in:
dla metody POST:

- testy dla tworzenia użytkownika - status 201,
- testy dla obiektu json zawierającego event id
- testy dla formatu jaki ma być zwracany z serwera
- testy dla walidacji: (m.in dla pustych pól i dla  
  nieistniejących pól)

dla metody GET:

- zwracanie wszystkich obiektów

Aby uruchomić test należy w głównej ścieżce projektu pierw wpisać:

```bash
cd server
```

a następnie komende dla testów:

```bash
npx jest
```

## Test dla front-endu/ client:

Ścieżka gdzie znajduje się test: client/test/Utils.test.js

Testujemy metodę, która nam renderuje komunikat błędu.
Ze względu na prosty formularz do tworzenia eventu, stworzyłem tylko jeden test.

Aby uruchomić test należy w głównej ścieżce projektu pierw wpisać:

```bash
cd client
```

a następnie komende dla testu:

```bash
npm test
```
