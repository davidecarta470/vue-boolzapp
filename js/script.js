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
        {
            name: 'Michela',
            avatar: '../img/avatar_io.jpg',
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
        {
            name: 'Fabrizio',
            avatar: '../img/avatar_1.jpg',
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
        {
            name: 'Federico',
            avatar: '../img/avatar_4.jpg',
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
      indice:0,
      messaggioDaInviare:'',
      nome_cercato:'',
      active:'',
  
    },
  
   

    methods:{

      getLastMessage(index){
        
        if(this.contacts[index].messages[this.contacts[index].messages.length - 1].status==='received'){
          LastMessage =  this.contacts[index].messages[ this.contacts[index].messages.length - 1].message
          if (LastMessage.length>20){
            LastMessage= LastMessage.slice(0,20) + '...'
          }
          return LastMessage
        }


      },
         


      getLastDate(index){
        return this.contacts[index].messages[ this.contacts[index].messages.length - 1].date
      },

      
      chatActive(index){
        this.active='active'
        this.indice=index
      },

      // Input di inserimento messaggio
      inserisci_messaggio(messaggioDaInviare,indice){
        // la condizione iniziale serve per impedire di inviare messaggi vuoti 
        if(messaggioDaInviare.length>0){
          let newMessage = {
            date:this.stampaDataOra(),
            message:messaggioDaInviare,
            status:'sent'
          }
          this.contacts[indice].messages.push(newMessage)
          if(this.messaggioDaInviare.length>0) {
            this.dai_risposta(indice)
          } 
          this.messaggioDaInviare=''
        }
      },

// do alla variabile indice il valore dellunico oggeto (nel caso del ciclo for/in questo valore è contact)  che ha il valore della chiave .visible === true
      cerca_nome_completo (){
        let counter=0
        for(let contact in this.contacts){
          if(this.contacts[contact].visible===true){
            counter++
            
          }
        }
        for(let contact in this.contacts){
          if(this.contacts[contact].visible===true && counter===1){
            this.indice=parseInt(contact)
            this.nome_cercato=''
          }else if(counter===0){
            this.nome_cercato=''  
          }
        }
      },

          
        
      cerca_nome(){
        // uso il keyup perchè il keydown mi fa vedere prima la stringa vuora di nome_cercato
        for(contact in this.contacts){
          let nome=this.contacts[contact].name
          let nomeMaiuscolo=this.contacts[contact].name.toLowerCase()
          this.contacts[contact].visible=false
            if(nomeMaiuscolo.includes(this.nome_cercato)||
              nome.includes(this.nome_cercato)){
              this.contacts[contact].visible=true
            }
        }
        
      },
        
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