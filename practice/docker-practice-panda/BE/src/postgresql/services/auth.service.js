import compareExp from '../../utils/compareExp.js';
import createToken from '../../utils/createToken.js';
import filterSensitiveData from '../../utils/filterSensitiveData.js';
import hashingPassword from '../../utils/hashingPassword.js';

export class AuthService {
  constructor(userRepo) {
    this.repo = userRepo;
  }

  getUserById = async id => {
    const user = await this.repo.findById(id);
    if (!user) return null;

    return filterSensitiveData(user);
  };

  createUser = async body => {
    const exist = await this.repo.findByEmail(body.email);
    if (exist) return true;

    const user = await this.repo.create(body);
    if (!user) return null;

    return filterSensitiveData(user);
  };

  signIn = async body => {
    const user = await this.repo.findByEmail(body.email);
    if (!user) return null;

    const { salt, password } = user;
    const hashedPassword = hashingPassword(body.password, salt);

    if (hashedPassword != password) return null;

    const accessToken = createToken(user, 'access');
    // NOTE refreshToken 발급 후 최근 발급된 토큰을 유저 정보에 저장
    const refreshToken = createToken(user, 'refresh');
    user.refreshToken = refreshToken;
    await this.repo.update(user.id, user);
    // NOTE 엄데이트될 데이터에 accessToken이 들어가지 않도록 뒤에서 추가
    user.accessToken = accessToken;

    return { user: filterSensitiveData(user), refreshToken };
  };

  getNewToken = async (userToken, refreshToken) => {
    const user = await this.repo.findById(userToken.userId);
    if (!user) return null;
    if (user.refreshToken !== refreshToken) return null;

    // NOTE 리프레시 토큰의 남은 시간이 2시간 이내일경우
    const timeRemaining = compareExp(userToken.exp);
    if (timeRemaining < 3600 * 2) {
      // NOTE 새 리프레시 토큰을 발급하고 이를 업데이트
      const refreshToken = createToken(user, 'refresh');
      user.refreshToken = refreshToken;
      await this.repo.update(user);
    }

    const accessToken = createToken(user, 'access');
    user.accessToken = accessToken;

    return filterSensitiveData(user);
  };
}
