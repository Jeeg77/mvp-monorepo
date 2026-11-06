1) Questo progetto (che usa le tecnologie menzionate in README.md) è stato creato esclusivamente per fare pratica con un deploy di 2 
   moduli, (in ambiente JS) backend e frontend, su OpenShift.

2) Inoltre viene utilizzato Supabase per la registrazione e la gestione degli utenti.

DEPLOY LOCALE:
- se non si avvia il progetto da tempo occorre fare il resume da Supabase, loggandosi.
- una volta che in Supabase il progetto è "healthy" si può effettuare 'npm run dev' del modulo backend.
- se si avvia correttamente in locale il backend espone le api a: http://localhost:4000/api-docs/
- per quanto riguarda il frontend si avvia in locale e risponde a: http://localhost:3000/


DEPLOY OPENSHIFT:

AS-IS: credo in locale non dia problemi ma ricordo che c'erano problemi con l'interfacciamento da OpenShift a Supabase.