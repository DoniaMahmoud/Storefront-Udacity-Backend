import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

const uModel =
  new UserModel();
const user: IUser =
  {
    email:
      'donia@gmail.com',
    first_name:
      'donia',
    last_name:
      'mahmoud',
    password:
      'password',
  };

describe('User CRUD Operations Suite', () => {
  beforeAll(
    async () => {
      const createdUser =
        await uModel.create(
          user
        );
      user.id =
        createdUser.id;
    }
  );
  const testCreateUser: IUser =
    {
      email:
        'test@gmail.com',
      first_name:
        'test',
      last_name:
        'test',
      password:
        'password',
    };
  //create
  it('should create a new user and return it', async () => {
    const createdUser =
      await uModel.create(
        testCreateUser
      );
    expect(
      createdUser
    ).toEqual({
      id: createdUser.id,
      email:
        'test@gmail.com',
      first_name:
        'test',
      last_name:
        'test',
    } as IUser);
  });
  //index => get all users
  it('should get all users and ensure that there are 2 created', async () => {
    const getAllUsers =
      await uModel.index();
    const numUsers =
      getAllUsers.length;
    expect(
      numUsers
    ).toEqual(2);
  });
  //show => get specific user
  it('should get the user with the specified id', async () => {
    const getUser =
      await uModel.show(
        user.id as string
      );
    expect(
      getUser
    ).toEqual({
      id: user.id,
      email:
        'donia@gmail.com',
      first_name:
        'donia',
      last_name:
        'mahmoud',
    } as IUser);
  });

  //update
  it('should get the updated user given the updated data', async () => {
    const getUpdatedUser =
      await uModel.edit(
        {
          id: user.id,
          email:
            'user@gmail.com',
          first_name:
            'user',
          last_name:
            'user',
          password:
            'userpassword',
        }
      );
    expect(
      getUpdatedUser.email
    ).toEqual(
      'user@gmail.com'
    );
    expect(
      getUpdatedUser.first_name
    ).toEqual(
      'user'
    );
    expect(
      getUpdatedUser.last_name
    ).toEqual(
      'user'
    );
  });

  //delete
  it('should get the deleted user given the delete id', async () => {
    const getDeletedUser =
      await uModel.delete(
        user.id as string
      );
    expect(
      getDeletedUser.email
    ).toEqual(
      'user@gmail.com'
    );
    expect(
      getDeletedUser.first_name
    ).toEqual(
      'user'
    );
    expect(
      getDeletedUser.last_name
    ).toEqual(
      'user'
    );
  });

  afterAll(
    async () => {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM users';
      await conn.query(
        sql
      );
      conn.release();
    }
  );
});

describe('User Login and Authetication Suite', () => {
  beforeAll(
    async () => {
      const createdUser =
        await uModel.create(
          user
        );
      user.id =
        createdUser.id;
    }
  );
  it('should return true if user logged in successfully', async () => {
    const loggedUser =
      await uModel.login(
        user.email,
        user.password
      );
    let flag =
      false;
    if (
      loggedUser?.email ===
        user.email &&
      loggedUser?.first_name ===
        user.first_name &&
      loggedUser?.last_name ===
        user.last_name
    ) {
      flag = true;
    }
    expect(
      flag
    ).toBe(true);
  });
  it('should return null if login failed', async () => {
    const loggedUser =
      await uModel.login(
        user.email,
        '1232'
      );
    expect(
      loggedUser
    ).toBe(null);
  });

  afterAll(
    async () => {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM users';
      await conn.query(
        sql
      );
      conn.release();
    }
  );
});
