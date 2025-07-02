import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonSpinner,
  IonButton
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
  const [votedIds, setVotedIds] = useState<number[]>([]); // ids des membres qui ont voté

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/scrutins/${id}/members`)
      .then(res => res.json())
      .then(response => {
        setMembers(response.data);
        const alreadyVoted = response.data
          .filter((m: Member) => m.has_voted === 1)
          .map((m: Member) => m.id);
        setVotedIds(alreadyVoted);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur API :', error);
        setLoading(false);
      });
  }, [id]);

   const handleVote = (id: number) => {
    setVotedIds(prev => [...prev, id]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Membres</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : members.length === 0 ? (
          <p>Aucun membre trouvé.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Prénom</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nom</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date de naissance</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Vote</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{member.first_name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{member.last_name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{member.birth_date}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {votedIds.includes(member.id) ? (
                      <span>A voté</span>
                    ) : (
                      <IonButton size="small" onClick={() => handleVote(member.id)}>
                        Voter
                      </IonButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScrutinMembers;
