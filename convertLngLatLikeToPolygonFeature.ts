/**
 * Converts a bounding box to a GeoJSON polygon feature.
 * This function takes a bounding box defined by its ne and sw corners
 * and returns a GeoJSON polygon feature that represents the bounding box.
 *
 * @param {BoundingBoxType} bbox - The bounding box to convert, defined by its northeast and southwest corners.
 * @returns {Feature<Polygon>} A GeoJSON polygon feature representing the bounding box.
 *
 * @throws {Error} If the provided LngLatLike object is invalid.
 */
export function convertLngLatLikeToPolygonFeature(
  bbox: BoundingBoxType,
): Feature<Polygon> {
  /**
   * Converts a LngLatLike object to a tuple of [longitude, latitude].
   *
   * @param {LngLatLike} lngLat - The LngLatLike object to convert. This can be an array of [longitude, latitude] or an object with 'lng' and 'lat' properties.
   * @returns {[number, number]} A tuple containing the longitude and latitude.
   *
   * @throws {Error} If the provided LngLatLike object is invalid.
   */
  const getLngLat = (lngLat: LngLatLike): [number, number] => {
    if (Array.isArray(lngLat)) {
      return lngLat;
    } else if ('lng' in lngLat && 'lat' in lngLat) {
      return [lngLat.lng, lngLat.lat];
    }
    throw new Error('Invalid LngLatLike object');
  };

  const { ne, sw } = bbox;

  const [swLng, swLat] = getLngLat(sw);
  const [neLng, neLat] = getLngLat(ne);

  // Define the four corners of the bounding box
  const coordinates = [
    [swLng, swLat], // SW corner
    [swLng, neLat], // NW corner
    [neLng, neLat], // NE corner
    [neLng, swLat], // SE corner
    [swLng, swLat], // Close the polygon by repeating the SW corner
  ];

  // Create a GeoJSON polygon feature
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
    properties: {},
  };
}
