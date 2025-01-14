export default function filterSensitiveData(data) {
  const { password, salt, refreshToken, ...rest } = data;

  return rest;
}
