export default function generatePrefixedSlashSlug(schoolType, cityName) {
  // Normalize and sanitize input
  const normalizedSchoolType = schoolType?.toLowerCase()?.replace(/\s+/g, "-");
  const normalizedCityName = cityName?.toLowerCase()?.replace(/\s+/g, "-");

  // Replace "school" with "schools-in" if it appears separately in schoolType
  const updatedSchoolType = normalizedSchoolType?.replace(
    /\bschool\b/g,
    "schools-in"
  );

  // Combine values into a slug with "/" only at the beginning
  const slug = `/${updatedSchoolType}-${normalizedCityName}`;

  // Encode the slug for a URL, excluding the '/'
  const encodedSlug = `/${encodeURI(slug).substring(1)}`;

  return encodedSlug;
}
