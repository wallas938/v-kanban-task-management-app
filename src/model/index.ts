export enum PaletteColor {
  FLICKR_PINK = "#f72585ff",
  BYZANTINE = "#b5179eff",
  PURPLE = "#7209b7ff",
  PURPLE_2 = "#560badff",
  TRYPAN_BLUE = "#480ca8ff",
  TRYPAN_BLUE_2 = "#3a0ca3ff",
  PERSIAN_BLUE = "#3f37c9ff",
  ULTRAMARINE_BLUE = "#4361eeff",
  DODGER_BLUE = "#4895efff",
  VIVID_SKY_BLUE = "#4cc9f0ff",
  LEMON_CHIFFON = "#fbf8ccff",
  CHAMPAGNE_PINK = "#fde4cfff",
  BABY_PINK = "#ffcfd2ff",
  PINK_LAVANDER = "#f1c0e8ff",
  MAUVE = "#cfbaf0ff",
  BABY_BLUE_EYES = "#a3c4f3ff",
  NON_PHOTO_BLUE = "#90dbf4ff",
  ELECTRIC_BLUE = "#8eecf5ff",
  MAGIC_MINT = "#98f5e1ff",
  GRANNY_SMITH_APPLE = "#b9fbc0ff",
  /* CULTURED = "f8f9faff",
  CULTURED_2 = "e9ecefff", */
}
export enum ThemeMode {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
export enum FieldState {
  PENDING = "PENDING",
  DIRTY = "DIRTY",
}
export enum FieldValidity {
  VALID = "VALID",
  INVALID = "INVALID",
}
export enum FormState {
  EDITION = "EDITION",
  CREATION = "CREATION",
  AUTHENTIFICATION = "AUTHENTIFICATION",
  REGISTRATION = "REGISTRATION",
}

export enum Modal {
  NO_MODAL = "NO_MODAL",
  BOARD_NAV_MODAL = "BOARD NAV MODAL",
  BOARD_FORM_MODAL = "BOARD FORM MODAL",
  TASK_FORM_MODAL = "TASK FORM MODAL",
  BOARD_DELETE_PROMPT = "BOARD DELETE PROMPT",
  TASK_DELETE_PROMPT = "TASK DELETE PROMPT",
  TASK_DETAIL_VIEW = "TASK DETAIL VIEW",
}

export interface KtmUser {
  accessToken: Promise<string>;
  refreshToken: string;
  email: string;
  metadata: UserMetaData;
  uid: string;
}

export interface UserMetaData {
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
}

export interface Board {
  id?: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  color: PaletteColor | null;
  tasks: Task[];
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  columnId: string;
  subtasks: Subtask[];
}
export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}
