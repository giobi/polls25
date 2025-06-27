# Piattaforma Test - Specifiche del Progetto

## Descrizione del Progetto
La piattaforma di test è un'applicazione web che consente agli utenti di accedere a vari test interattivi. Gli utenti possono visualizzare i test disponibili o cercare test specifici. Ogni test è composto da domande a risposta singola che contribuiscono a determinare il profilo dell'utente.

## Struttura dei File
- **index.html**: Pagina principale dell'applicazione con layout e collegamenti per accedere ai test.
- **poll-v1.html**: Pagina per visualizzare il test della versione 1, con markup HTML per le domande e raccolta delle risposte.
- **poll-v2.html**: Pagina per visualizzare il test della versione 2, con supporto per skill multiple e sistema di profili avanzato.
- **polls/sei-sith-o-jedi.json**: File JSON che memorizza i dati del test "Sei Sith o Jedi", inclusa la struttura delle domande e i punteggi.
- **polls/che-tipo-di-mangiatore-sei.json**: File JSON v2 che memorizza il test alimentare con sistema di skill multiple.
- **polls/template/v1.json**: Template di esempio per la versione 1, definisce la struttura delle domande e il modo di lettura.
- **polls/template/v2.json**: Template di esempio per la versione 2, con sistema di skill multiple e profili basati su valori numerici.
- **polls/template/v3.json**: Template di esempio per la versione 3, con ulteriori aggiornamenti.
- **js/app.js**: Punto di ingresso dell'applicazione, gestisce la logica principale e l'interazione con l'utente.
- **js/test-runner.js**: Gestisce l'esecuzione dei test versione 1, caricando domande e calcolando punteggi.
- **js/test-runner-v2.js**: Gestisce l'esecuzione dei test versione 2, con sistema di skill multiple e algoritmo di matching dei profili.
- **css/style.css**: Contiene gli stili CSS per l'applicazione, utilizzando Bootstrap 5.

## Tecnologie Utilizzate
- **HTML**: Struttura della pagina.
- **CSS**: Stili e layout, con Bootstrap 5.
- **JavaScript**: Logica dell'applicazione e interazione utente.
- **JSON**: Memorizzazione dei dati dei test e dei template.

## Funzionalità
- Accesso ai test disponibili tramite la pagina principale.
- Ricerca di test specifici.
- **Versione 1**: Visualizzazione e completamento dei test con domande a risposta singola che contribuiscono a determinare il profilo dell'utente.
- **Versione 2**: Sistema avanzato con domande a risposta multipla che valorizzano diverse skill numeriche (es. fat, carbs, protein, fiber). I profili sono definiti da range di valori per ogni skill e vengono valutati in ordine dal più al meno restrittivo.
- Calcolo dei punteggi e determinazione del profilo dell'utente.

## Versione 2 - Sistema Skill e Profili

### Struttura delle Domande V2
Le domande della versione 2 utilizzano un sistema di skill multiple:
- Ogni risposta ha valori numerici per diverse skill (es. fat, carbs, protein, fiber)
- I valori delle risposte si sommano per calcolare il punteggio totale per ogni skill
- Esempio: "Ti piace di più mangiare:"
  - Gelato: fat:5, carbs:10, protein:1
  - Pizza: fat:3, carbs:3, protein:2

### Sistema dei Profili V2
I profili sono definiti da range di valori per ogni skill:
- Ogni profilo specifica valori min/max per le skill
- I profili vengono valutati in ordine dal più al meno restrittivo
- Il primo profilo che soddisfa tutti i criteri viene assegnato
- **IMPORTANTE**: I test V2 devono sempre avere profili finali "catch-all" che coprano qualsiasi combinazione di skill residua
- Il profilo finale deve avere parametri molto ampi (es. min: 0, max: 100 per tutte le skill) per garantire che ogni utente riceva sempre un risultato
- Esempio profilo "Sano": fat max:2 min:0, protein max:8 min:5, fiber min:5 max:10
- Esempio profilo finale "Indefinito": tutte le skill con min:0 max:100

## Note
Assicurarsi che tutti i file siano correttamente collegati e che le funzionalità siano testate per garantire un'esperienza utente fluida.