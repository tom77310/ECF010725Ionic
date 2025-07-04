import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ScrutinMembers from './pages/ScrutinMembers';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import ScrutinStats from './pages/ScrutinStats';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/** redirection vers le tableau avec les scrutins */}
         <Route exact path="/scrutins" component={Home} /> 
        <Redirect exact from="/" to="/scrutins" />

        {/** redirection vers le tableau avec les membres depuis le tableau des scrutins */}
        <Route exact path="/api/v1/scrutins/:id/members" component={ScrutinMembers} />

        {/** redirection vers la pages des statistiques depuis le tableau des scrutins */}
        <Route exact path="/stats/:id" component={ScrutinStats} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
