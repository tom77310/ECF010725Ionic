import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  has_voted: number;
}

const ScrutinMembers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/scrutins/${id}/members`)
      .then(res => res.json())
      .then(response => {
        setMembers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur API :', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Membres du scrutin {id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <p>Chargement...</p>
        ) : members.length === 0 ? (
          <p>Aucun membre trouvé.</p>
        ) : (
          <IonList>
            {members.map(member => (
              <IonItem key={member.id}>
                <IonLabel>
                  {member.first_name} {member.last_name} — Né(e) le {member.birth_date} — {member.has_voted ? "A voté" : "N'a pas voté"}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScrutinMembers;
