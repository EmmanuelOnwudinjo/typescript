type User = {
  name: string;
  age: number;
  type: 'user';
};

type Admin = {
  name: string;
  role: string;
  type: 'admin';
};

type Criteria<T> = Partial<Omit<T, 'type'>>;


function filterPersons(
  persons: (User | Admin)[],
  personType: 'user',
  criteria: Criteria<User>
): User[];
function filterPersons(
  persons: (User | Admin)[],
  personType: 'admin',
  criteria: Criteria<Admin>
): Admin[];
{
  return persons.filter(person => {
    if (person.type !== personType) return false;
    return Object.entries(criteria).every(([key, value]) => 
      person[key as keyof typeof person] === value
    );
  }) as any; 
}

const persons: (User | Admin)[] = [
  { name: 'Emmanuel', age: 21, type: 'user' },
  { name: 'Jackson', role: 'Supervisor', type: 'admin' }
];

const filteredUsers = filterPersons(persons, 'user', { age: 21 });
console.log(filteredUsers); // [{ name: 'Emmanuel', age: 21, type: 'user' }]

const filteredAdmins = filterPersons(persons, 'admin', { role: 'Manager' });
console.log(filteredAdmins); // [{ name: 'Jackson', role: 'Manager', type: 'admin' }]
