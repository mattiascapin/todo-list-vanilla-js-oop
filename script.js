// secondo step: 1) creo la classe per TodoList.
class TODOList {
  constructor() {
    // 3) inserisco i parametri della classe.
    this.tasks = []; // lista di stringhe, ovvero il contenitore di tutte le nostre task ["andare al cinema", "studiare codice", "dormire"] -> ma per iniziare, this.tasks = []
    // da sostituire poi con il punto 8 finale.

    // 8)
    this.tasks = this.caricaTask();

    // 9)
    this.generaTask();
    console.log('TODOList: ', this.tasks);
  }

  // 8.1) funzione per caricare le task al loading.
  caricaTask() {
    const tasks = JSON.parse(localStorage.getItem('ListaTasks')) ?? []; // se non trovi nulla nel localStorage allora assegna a tasks un array vuoto (come avevamo inizialmente).
    return tasks;
  }

  // 9) genero task da localStorage altrimenti la UI non si aggiorna.
  generaTask() {
    this.tasks.forEach((task) => {
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(task));
      todo.appendChild(p);

      p.addEventListener('click', (e) => {
        this.concludiTask(task);
        e.target.remove();
      });
    });
  }

  // 4) gestiamo l'aggiunta dei task
  aggiungiTask(task) {
    this.tasks.push(task);
    console.log('TODOList aggiornata: ', this.tasks);

    //5) mandare i risultati della todo list a schermo: // mostrare hardcodando come verrà il risultato finale.
    const todo = document.getElementById('todo');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(task));
    todo.appendChild(p);

    // 6.2) al click di un elemento della lista questo si completa e si cancella.
    p.addEventListener('click', (e) => {
      this.concludiTask(task);
      e.target.remove();
    });

    // BONUS: volendo fare ordine possiamo generare il task separatamente. quindi:
    //this.generaNuovoTask(task);

    // 7.1) salvo le task nel localStorage.
    // errore: localStorage.setItem('ListaTasks', this.tasks); // ispeziona, applications, localstorage
    localStorage.setItem('ListaTasks', JSON.stringify(this.tasks)); // mi torna il json con array così è più facile accederci.
  }

  // 6.1) funzione per concludere/eliminare una task dall'array TODOList (quindi eliminare l'elemento da tutta la lista dei task
  concludiTask(task) {
    console.log(`${task} completato!`);
    console.log(this.tasks);

    // 6.3) becchiamo l'indice per rimuoverlo dalla lista.
    const index = this.tasks.indexOf(task);
    console.log(index); // posizione all'interno dell'array
    console.log(this.tasks[index]); // task effettiva selezionata
    // elimino quindi l'elemento.
    this.tasks.splice(index, 1);
    /* esempi per capire il metodo splice su array
    splice(start, deleteCount)
    splice(start, deleteCount, item1)
    */
    console.log(this.tasks);

    // 7.2)
    localStorage.setItem('ListaTasks', JSON.stringify(this.tasks)); // mi torna il json con array così è più
  }

  /* BONUS:
  generaNuovoTask(task) {
    const todo = document.getElementById('todo');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(task));
    todo.appendChild(p);
  } */
}

// primo step: controllare il funzionamento dei bottoni
document.addEventListener('DOMContentLoaded', () => {
  const newTaskBtn = document.getElementById('new-task-btn'); // selezione bottone aggiungi task
  const clearBtn = document.getElementById('clear-btn'); // seleziono il bottone pulisci
  const input = document.getElementById('new-task'); // seleziono il campo di input

  // secondo step: 3) istanzio la clase TODOList per effettuare il console.log
  const todoList = new TODOList();

  // Nuova task premendo sul bottone
  newTaskBtn.addEventListener('click', () => {
    console.log('Nuovo task da bottone');
    // 4) invoco funzione per aggiungere un task e lo inserisco anche nella funzione di keypress
    todoList.aggiungiTask(input.value);
    //console.log(input.value);
  });

  clearBtn.addEventListener('click', () => {
    console.log('Pulisci task');
  });

  // Nuova task premendo Enter
  input.addEventListener('keypress', (e) => {
    // 1) console.log(e);  becca l'invio (key)
    // 2)
    if (e.key === 'Enter') {
      console.log('Ho premuto Enter');
      // 4)
      todoList.aggiungiTask(input.value);
      input.value = '';
    }
  });

  // secondo step: 2) esempio di cosa vogliamo fare. => recap lezione precedente.
  /* const todoList1 = new TODOList();
  todoList1.aggiungiTask;
  todoList1.rimuoviTask;
  todoList1.clearTask; */

  //meglio così piuttosto di avere funzioni sciolte tipo:
  // function pulisciTODOList(riferimentoTodolist) ecc..
});

// ESERCIZIO FINALE:
// usare il bottone per pulire tutte le task in un colpo solo!
