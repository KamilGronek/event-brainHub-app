1. opis projektu
2. client - instrukcja uruchomienia klienta i uruchomienie testów
3. server- instrukcja uruchomienia servera i uruchomienia testów

# Wprowadzenie:

Stworzyłem prosty formularz zaimplementowany w React'cie
i połączyłem z prostym API napisanego w Node.js (Express.js), z wykorzystaniem Bazy MySQL.

## Technologie:

-React: 17.0.2,
-Node: 12.16.1,
-Express: 4.17.1

## Konfigurowanie środowiska

### Żądanie jakie musi wysłać na serwer Node.js:

url: localhost:80/api/project-board,
method: post,
headers:
Content-Type: application/json
Accept: application/json

body:
{
"username": "kamil.gronek@gmail.com",
"password": "test123456"
}

## Uruchomienie aplikacji:

Po pobraniu pliku do instalacji środowiska node.modules, dla folderu "client" w terminalu należy wpisać:

```bash
cd client
```

a następnie:

```bash
npm install
```

Po uruchomienia aplikacji frontendowej, w nowym terminalu w głównej ścieżce projektu, należy wpisać:

```bash
cd server
```

następnie:

```bash
npm install
```

następnie aby uruchowmić serwer:

```bash
node server.js
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

## Testy dla back-endu/ server:

Ścieżka gdzie znajdują się testy: server/test/app.test.js

Robimy kilka testów dla metody GET/POST a w niej m.in:
dla metody POST:

- testy dla tworzenia użytkownika - status 201,
- testy dla objektu json zawierającego event id
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
