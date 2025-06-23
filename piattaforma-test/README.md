# Piattaforma Test

Benvenuti nella Piattaforma Test, un'applicazione web progettata per offrire una serie di test interattivi in italiano. Gli utenti possono accedere a vari test, rispondere a domande e scoprire il proprio profilo.

## Struttura del Progetto

Il progetto è organizzato come segue:

- **index.html**: Pagina principale dell'applicazione, con collegamenti ai test disponibili e opzioni di ricerca.
- **poll-v1.html**: Pagina dedicata alla visualizzazione del test per la versione 1, con markup HTML per le domande e raccolta delle risposte.
- **polls/sei-sith-o-jedi.json**: File JSON che contiene i dati del test "Sei Sith o Jedi", inclusa la struttura delle domande e i punteggi.
- **polls/template/**: Cartella contenente i template per le versioni dei test:
  - **v1.json**: Template per la versione 1.
  - **v2.json**: Template per la versione 2.
  - **v3.json**: Template per la versione 3.
- **js/app.js**: File JavaScript principale che gestisce la logica dell'applicazione.
- **js/test-runner.js**: File JavaScript per l'esecuzione dei test e il calcolo dei punteggi.
- **css/style.css**: File CSS per la formattazione dell'applicazione, utilizzando Bootstrap 5.

## Installazione

1. Clona il repository:
   ```
   git clone <URL del repository>
   ```
2. Naviga nella cartella del progetto:
   ```
   cd piattaforma-test
   ```
3. Apri `index.html` nel tuo browser per iniziare a utilizzare l'applicazione.

## Utilizzo

- Accedi alla pagina principale per visualizzare i test disponibili.
- Clicca su un test per iniziare o utilizza la funzione di ricerca per trovare un test specifico.
- Rispondi alle domande e scopri il tuo profilo al termine del test.

## Contributi

Se desideri contribuire al progetto, sentiti libero di aprire una pull request o segnalare problemi.

## Licenza

Questo progetto è concesso in licenza sotto la MIT License.