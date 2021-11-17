const app = new Vue({
  el: '#app',
  data: {
      contacts: [
        {
            name: 'Michele',
            avatar: '../img/avatar_1.jpg',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
              },
              {
                  date: '10/01/2020 15:50:00',
                  message: 'Ricordati di dargli da mangiare',
                  status: 'sent'
              },
              {
                  date: '10/01/2020 16:15:22',
                  message: 'Tutto fatto!',
                  status: 'received'
              }
          ],
        },
        {
            name: 'Fabio',
            avatar: '../img/avatar_2.jpg',
            visible: true,
            messages: [{
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'received'
            }
          ],
        },
        {
            name: 'Samuele',
            avatar: '../img/avatar_3.jpg',
            visible: true,
            messages: [{
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
          ],
        },
        {
            name: 'Luisa',
            avatar: '../img/avatar_6.jpg',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
          ],
        },
      ]
      ,
      indice:-1,
      messaggioDaInviare:'',
      nome_cercato:'',
      active:'',
    },
  
   

    methods:{

      getLastMessage(index){
        // index = 0
        // let indexLastMessage = this.contacts[index].messages.length - 1;
        // this.contacts[index].messages[indexLastMessage]
        

         if (this.contacts[index].messages[ this.contacts[index].messages.length - 1].message.length>20)
        {
          return this.contacts[index].messages[ this.contacts[index].messages.length - 1].message.slice(0,20) + '...'
        }
          return this.contacts[index].messages[ this.contacts[index].messages.length - 1].message
      },


      getLastDate(index){
        return this.contacts[index].messages[ this.contacts[index].messages.length - 1].date
      },
      // Utenti trovati(HTML)
      // assegno ad indice il valore index(parametro del v-for )
      chatActive(index){
        this.active='active'
        this.indice=index
      },

      // Input di inserimento messaggio
      inserisci_messaggio(messaggioDaInviare,indice){
        this.contacts[indice].messages.push({date:this.stampaDataOra(),message:messaggioDaInviare,status:'sent'})
        if(this.messaggioDaInviare.length>0) {
          this.dai_risposta(indice)
        } 
        this.messaggioDaInviare=''
      },


      cerca_nome (){
        // for(let i =0 ;i<this.contacts.length ;i++){
        //   if(this.contacts[i].name===this.nome_cercato){
        //     this.contacts[i].visible=true
        //     // visualizzazione chat al premere del'invio
        //     console.log(i)
        //     this.indice=i;   
        //   }
        // }
        for(let contact in this.contacts){
          this.contacts[contact].visible=false
          if(this.contacts[contact].name===this.nome_cercato){
            this.contacts[contact].visible=true
            // visualizzazione chat al premere del'invio
            // il parseInt serve perche' contact è un numero in formato stringa
            this.indice=parseInt(contact)
          }
        }
        this.nome_cercato=''
      },
            //  

        
      // risposta automatica del computer + inserimento data e ora
      dai_risposta(indice){
        setTimeout(()=>{
          this.contacts[indice].messages.push({date:this.stampaDataOra(),message:'ok',status:'received'})
        },1000)
      },

      stampaDataOra(){
        let d = new Date()
        this.dataOra=`
        ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} 
        ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        return this.dataOra
      },
    },
      
})