import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';


interface Scrutin {
  title : string;
  start_at : Date;
  ends_at : Date;
}

const Home: React.FC = () => {

const [scrutin, setScrutin] = useState<Scrutin>();
const [Loading, setLoading] = useState(true);


useEffect(()=>{
  fetch('http://localhost:3000/api/v1/scrutins') // connexion a l'api pour recuperer les scrutins
  .then(res => res.json())
  .then(response => {
      setScrutin(response.data) // recupere les données des scrutins
      console.log(response.data);
      
    })
    .catch(error => {
      console.error('Erreur API :', error);
      setLoading(false);
    });
}, [])

return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vote App V2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <h1>{scrutin?.title}</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
