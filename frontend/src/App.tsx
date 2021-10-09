import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import moment from 'moment';

import './/common/typings/import';
import { history, store } from './store';
import { Router } from './features/Router/Router';
import { Theme } from './features/Theme/Theme';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ru from 'date-fns/esm/locale/ru';
import { SnackbarProvider } from 'notistack';

moment.locale('ru');

export const App: React.FC = hot(() => (
  <Provider store={store}>
    <Theme>
      <Suspense fallback={<div/>}>
        <ConnectedRouter history={history}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
              <SnackbarProvider maxSnack={10} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                  <Router/>
              </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </ConnectedRouter>
      </Suspense>
    </Theme>
  </Provider>
));

