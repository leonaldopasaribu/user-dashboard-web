import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserDtoJsonPlaceholder } from './user.dto.jsonplaceholder';
import { UserMapperJsonPlaceholder } from './user.mapper.jsonplaceholder';
import { UserRepositoryJsonPlaceholder } from './user.repository.jsonplaceholder';

import { UserEntity } from 'src/app/core/entities/user.entity';
import {
  USER_ENTITY_MOCK,
  USER_DTO_MOCK,
} from 'src/app/shared/mocks/user.mocks';
import { environment } from 'src/environments/environment';

describe('UserRepositoryJsonPlaceholder', () => {
  let httpTestingController: HttpTestingController;
  let repository: UserRepositoryJsonPlaceholder;
  let mapper: UserMapperJsonPlaceholder;

  const userMapperJsonPlaceholderSpy = jasmine.createSpyObj(
    'UserMapperJsonPlaceholder',
    ['toEntity'],
  );

  const usersEntityMock: UserEntity[] = [USER_ENTITY_MOCK];

  const userMockResponse: UserDtoJsonPlaceholder[] = [USER_DTO_MOCK];

  const baseUrl = `${environment.jsonPlaceholderApiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserRepositoryJsonPlaceholder,
        {
          provide: UserMapperJsonPlaceholder,
          useValue: userMapperJsonPlaceholderSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(UserRepositoryJsonPlaceholder);
    mapper = TestBed.inject(UserMapperJsonPlaceholder);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create UserRepositoryJsonPlaceholder', () => {
    expect(repository).toBeTruthy();
  });

  it(`should call ${baseUrl}/users when method fetchAll is called`, (done: DoneFn) => {
    const url = `${baseUrl}/users`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedUrl = url;

    toEntitySpy.and.returnValue(usersEntityMock);

    repository.fetchAll().subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.url;

    expect(result).toBe(expectedUrl);

    request.flush(userMockResponse);
  });

  it(`should call get on httpClient when method fetchAll is called`, (done: DoneFn) => {
    const url = `${baseUrl}/users`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedMethod = 'GET';

    toEntitySpy.and.returnValue(usersEntityMock);

    repository.fetchAll().subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.method;

    expect(result).toBe(expectedMethod);

    request.flush(userMockResponse);
  });

  it(`should call ${baseUrl}/users/1 when method fetchOne with 1 is called`, (done: DoneFn) => {
    const userId = '1';
    const url = `${baseUrl}/users/${userId}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedUrl = url;

    toEntitySpy.and.returnValue(usersEntityMock[0]);

    repository.fetchOne(userId).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.url;

    expect(result).toBe(expectedUrl);

    request.flush(userMockResponse);
  });

  it(`should call get on httpClient when method fetchOne with argument 1 is called`, (done: DoneFn) => {
    const userId = '1';
    const url = `${baseUrl}/users/${userId}`;
    const toEntitySpy = mapper.toEntity as jasmine.Spy;
    const expectedMethod = 'GET';

    toEntitySpy.and.returnValue(usersEntityMock[0]);

    repository.fetchOne(userId).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.method;

    expect(result).toBe(expectedMethod);

    request.flush(userMockResponse);
  });
});
