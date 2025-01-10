import { Routes } from '@angular/router';
import { BuildComponent } from './components/pages/build/build.component';
import { PlayComponent } from './components/pages/play/play.component';

export const routes: Routes = [
  { path: '', component: BuildComponent, pathMatch: 'full' },
  { path: 'play', component: PlayComponent }
];
