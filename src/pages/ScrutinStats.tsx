import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonButton
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Stats {
  total: number;
  voted: number;
  participation_rate: number;
}

const ScrutinStats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/scrutins/${id}/stats`)
      .then(res => res.json())
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur API stats :', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistiques du scrutin {id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : stats ? (
          <div>
            <p><strong>Total de vote pour ce scrutin :</strong> {stats.total} votes au total pour ce scrutin</p>
            <p><strong>Nombre de votes :</strong> {stats.voted} votes</p>
          </div>
        ) : (
          <p>Aucune statistique disponible.</p>
        )}
        <IonButton expand="block" color="medium" onClick={() => history.goBack()}>
          Retour
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScrutinStats;
