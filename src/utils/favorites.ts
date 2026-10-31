import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteType =
  | "Destination"
  | "Hotel"
  | "Restaurant";

export type FavoriteItem = {
  id: string;
  name: string;

  type: FavoriteType;

  // Destination fields
  icon?: string;
  cuisine?: string;

  // Hotel / restaurant fields
  image?: string;
  location?: string;
  price?: string;
  rating?: string | number;
  description?: string;

  // Extra fields used by different screens
  address?: string;
  category?: string;
  city?: string;
};

const FAVORITES_KEY = "@tripnova_favorites";

/* =========================================
   GET FAVORITES
========================================= */

export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const saved = await AsyncStorage.getItem(
      FAVORITES_KEY
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as FavoriteItem[];
  } catch (error) {
    console.log(
      "Error getting favorites:",
      error
    );

    return [];
  }
}

/* =========================================
   SAVE FAVORITES
========================================= */

async function saveFavorites(
  favorites: FavoriteItem[]
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.log(
      "Error saving favorites:",
      error
    );
  }
}

/* =========================================
   CHECK FAVORITE
========================================= */

export async function isFavorite(
  id: string
): Promise<boolean> {
  try {
    const favorites = await getFavorites();

    return favorites.some(
      (item) => item.id === id
    );
  } catch (error) {
    console.log(
      "Error checking favorite:",
      error
    );

    return false;
  }
}

/* =========================================
   TOGGLE FAVORITE
========================================= */

export async function toggleFavorite(
  item: FavoriteItem
): Promise<boolean> {
  try {
    const favorites = await getFavorites();

    const index = favorites.findIndex(
      (favorite) => favorite.id === item.id
    );

    /*
      If already saved:
      remove it
    */
    if (index !== -1) {
      favorites.splice(index, 1);

      await saveFavorites(favorites);

      return false;
    }

    /*
      If not saved:
      add it
    */
    favorites.push(item);

    await saveFavorites(favorites);

    return true;
  } catch (error) {
    console.log(
      "Error toggling favorite:",
      error
    );

    return false;
  }
}

/* =========================================
   REMOVE FAVORITE
========================================= */

export async function removeFavorite(
  id: string
): Promise<void> {
  try {
    const favorites = await getFavorites();

    const updatedFavorites =
      favorites.filter(
        (item) => item.id !== id
      );

    await saveFavorites(updatedFavorites);
  } catch (error) {
    console.log(
      "Error removing favorite:",
      error
    );
  }
}

/* =========================================
   CLEAR ALL FAVORITES
========================================= */

export async function clearFavorites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(
      FAVORITES_KEY
    );
  } catch (error) {
    console.log(
      "Error clearing favorites:",
      error
    );
  }
}