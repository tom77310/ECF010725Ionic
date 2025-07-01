import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

interface Scrutin {
  id:number;
  title : string;
  start_at : Date;
  ends_at : Date;
}

const Home: React.FC = () => {

const [scrutin, setScrutin] = useState<Scrutin>();
const [loading, setLoading] = useState(true);


useEffect(()=>{
  fetch('http://localhost:3000/api/v1/scrutins') // connexion a l'api pour recuperer les scrutins
  .then(res => res.json())
  .then(response => {
      setScrutin(response.data) // recupere les données des scrutins
      console.log(response.data);
      setLoading(false);
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
        {loading ? (
          <IonSpinner name="crescent" />
        ) : scrutin.length === 0 ? (
          <p>Aucun scrutin disponible.</p>
        ): (
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date de début</th>
                <th>Date de Fin</th>
              </tr>
            </thead>
            <tbody>
               {scrutin.map(scrutin =>
                 <tr key={scrutin.id}>
                <th>{scrutin.title}</th>
                <th>{new Date(scrutin.starts_at).toLocaleString('fr-FR')}</th>
                <th>{new Date(scrutin.ends_at).toLocaleString('fr-FR')}</th>
              </tr>
               )}
            </tbody>
          </table>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
