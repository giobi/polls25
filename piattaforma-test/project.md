# Piattaforma Test - Specifiche del Progetto

## Descrizione del Progetto
La piattaforma di test è un'applicazione web che consente agli utenti di accedere a vari test interattivi. Gli utenti possono visualizzare i test disponibili o cercare test specifici. Ogni test è composto da domande a risposta singola che contribuiscono a determinare il profilo dell'utente.

## Struttura dei File
- **index.html**: Pagina principale dell'applicazione con layout e collegamenti per accedere ai test.
- **poll-v1.html**: Pagina per visualizzare il test della versione 1, con markup HTML per le domande e raccolta delle risposte.
- **polls/sei-sith-o-jedi.json**: File JSON che memorizza i dati del test "Sei Sith o Jedi", inclusa la struttura delle domande e i punteggi.
- **polls/template/v1.json**: Template di esempio per la versione 1, definisce la struttura delle domande e il modo di lettura.
- **polls/template/v2.json**: Template di esempio per la versione 2, con modifiche rispetto alla versione 1.
- **polls/template/v3.json**: Template di esempio per la versione 3, con ulteriori aggiornamenti.
- **js/app.js**: Punto di ingresso dell'applicazione, gestisce la logica principale e l'interazione con l'utente.
- **js/test-runner.js**: Gestisce l'esecuzione dei test, caricando domande e calcolando punteggi.
- **css/style.css**: Contiene gli stili CSS per l'applicazione, utilizzando Bootstrap 5.

## Tecnologie Utilizzate
- **HTML**: Struttura della pagina.
- **CSS**: Stili e layout, con Bootstrap 5.
- **JavaScript**: Logica dell'applicazione e interazione utente.
- **JSON**: Memorizzazione dei dati dei test e dei template.

## Funzionalità
- Accesso ai test disponibili tramite la pagina principale.
- Ricerca di test specifici.
- Visualizzazione e completamento dei test con domande a risposta singola.
- Calcolo dei punteggi e determinazione del profilo dell'utente.

## Note
Assicurarsi che tutti i file siano correttamente collegati e che le funzionalità siano testate per garantire un'esperienza utente fluida.