import { IonButton, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

interface Scrutin {
  id:number;
  title : string;
  starts_at : Date;
  ends_at : Date;
}

const Home: React.FC = () => {

const [scrutin, setScrutin] = useState<Scrutin[]>([]);
const [loading, setLoading] = useState(true);

const history = useHistory(); // permet de changer de page équivalent de useNavigate
const handleVoir = (id:number) => { // fonction qui permet de changer la valeur du boutton lorsqu'i est cliquer, il passe de "voir" a "à voter"
  history.push(`/api/v1/scrutins/${id}/members`); // permet de rester sur la page des membres et réactualiser automatiquement la page pour changer la valeur du boutton
};


useEffect(()=>{
  fetch('http://localhost:3000/api/v1/scrutins') // connexion a l'api pour recuperer les scrutins
  .then(res => res.json())
  .then(response => {
      setScrutin(response.data) // recupere les données des scrutins
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
        ) : scrutin.length === 0 ? ( // si il n'y a pas de donnée
          <p>Aucun scrutin disponible.</p> // alors affiche le message "aucun scrutins disponibles"
        ): ( // sinon il affiche le tableau avec les données
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date de début</th>
                <th>Date de Fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
               {scrutin.map(scrutin => // boucle pour recuperer chaque données
                 <tr key={scrutin.id}>
                <th>{scrutin.title}</th>
                <th>{new Date(scrutin.starts_at).toLocaleString('fr-FR')}</th>
                <th>{new Date(scrutin.ends_at).toLocaleString('fr-FR')}</th>
                <th>
                  <IonButton size="small" onClick={()=> handleVoir(scrutin.id)} > 
                    Voir
                  </IonButton>
                  {/** routerLink = equivalent href, redirection vers l'url donnée. scrutin.id est remplacé par le vrai id du scrutin */}
                  <IonButton size="small" color= "secondary" routerLink= {`/stats/${scrutin.id}`} > 
                    Voir les statistiques du scrutin
                  </IonButton>
                </th>
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
