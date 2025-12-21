import { useAsync, apiGet } from "@chappy/utils/api";

/**
 * Obtains list favorites using the showAction of the FavoritesController.
 * @returns 
 */
const useFavorites = () => {
    const { data, loading, error } = useAsync(({ signal }) => 
            apiGet('/favorites/show', { signal }))
    
    let favorites = data?.data;

    return { favorites }
}

export default useFavorites;