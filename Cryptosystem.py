import math
import random
# intermediary class used to describe the key for our Affine class.
# Our keys are usually of the format f(x)= ax + b
class Key:
    def __init__(self, a, b):
        self.a = a
        self.b = b


class Affine:
    def __init__(self, a=1, b=0, plaintext='', ciphertext=''):
        self.plaintext = plaintext
        self.ciphertext = ciphertext
        self.key = Key(a, b)

    def encrypt(self, text='', a=1, b=0):
        # setting up our class variables depending on the parameters
        if text != '':
            self.plaintext = text
        if a != 1 or b != 0:
            self.key = Key(a, b)
        # encrypting by turning our letters into numbers based python functions ord() and chr(),
        # and using the format f(x)= a(x)+b where x is a character in our plaintext,
        # and store each f(x) in self.ciphertext
        self.ciphertext = ''
        for char in self.plaintext:
            val = ord(char)
            if char.isupper():  # if our character is an uppercase letter
                temp = ((self.key.a * (val - 65)) + self.key.b) % 26 + 65
                self.ciphertext += chr(temp)
            else:
                temp = ((self.key.a * (val - 97)) + self.key.b) % 26 + 97
                self.ciphertext += chr(temp)

        return self.ciphertext

    def decrypt(self, text='', a=1, b=0):
        if text != '':
            self.ciphertext = text
        if a != 1 or b != 0:
            self.key = Key(a, b)
        if math.gcd(a, 26) != 1:  # checks if a and 26 are co-primes
            print('Decryption can not continue because of wrong key')
            return
        # If a and 26 are indeed co-primes,
        # we need to find a_inverse such that (a_inverse * a)(mod 26) = 1(mod 26)
        # here we find a_inverse
        a_inverse = 1
        for i in range(54):
            if (self.key.a * i) % 26 == 1 and i != 1:
                a_inverse = i
                break
        # decryption step after finding a_inverse
        # x= ((f(x) - b) * a_inverse) (mod 26)
        self.plaintext = ''
        for char in self.ciphertext:
            val = ord(char)
            if char.isupper():
                temp = (((val - self.key.b - 65) * a_inverse) % 26) + 65
                self.plaintext += chr(temp)
            else:
                temp = (((val - self.key.b - 97) * a_inverse) % 26) + 97
                self.plaintext += chr(temp)
        return self.plaintext


#below is the trial for affine encryption and decryption
trial = Affine()
print("the affine encrypted value is: ",trial.encrypt('abebe', 3, 2))
print("the affine decrpted value is: ", trial.decrypt('cfofo'))
print("------------------------------------")


class Transposition:
    def __init__(self, keyword='abcd', plaintext='', ciphertext=''):
        self.plaintext = plaintext
        self.ciphertext = ciphertext
        self.block_store = []  # list to store text strings in blocks during encryption or decryption
        self.keyword = keyword  # keyword is the key used in encryption and decryption. It is set to 'abcd' at default
        self.block_len = len(self.keyword)

    # we need to generate an order function that is one to one with our keyword
    # the order is based on which letter comes first in our keyword (alphabetical order)
    # example: if keyword is 'abcd', order is '1234'
    # since 'a' comes first and 'b' comes second, 'c' 3rd and 'd' 4th.
    # example: if keyword is 'plan', order is '4213'.
    # i.e because the 3rd letter, 'a', comes before all the other letters. 'l' comes 2nd, 'n' 3rd and 'p' 4th
    def key_order_generator(self):
        order = 0
        for char in self.keyword:
            val = ord(char)
            count = 1
            for i in range(self.block_len):
                temp = ord(self.keyword[i])
                if val > temp:
                    count += 1
            order = (order * 10) + count
        # we return the order in string format to help aid in latter steps
        return str(order)

    def encrypt(self, plaintext='', keyword='abcd'):
        # updating class variables if our parameters are new and different
        if self.keyword != keyword and keyword != 'abcd':
            self.keyword = keyword
            self.block_len = len(self.keyword)
        if self.plaintext != plaintext and plaintext != '':
            self.plaintext = plaintext
        # we want to omit the space, ' ', between words
        # to effectively handle our blocks and
        # to hide our spaces from people trying to decipher the message without a key
        if ' ' in self.plaintext:
            temp = ''
            for char in self.plaintext:
                if char != ' ':
                    temp += char
            self.plaintext = temp

        # there is no point in encrypting an empty plaintext
        if self.plaintext == '':
            print("No plaintext entered for encryption")
            return

        # Our key shouldn't have repeated characters.
        # for example 'kill' is an invalid key because 'l' is repeated
        for i in range(len(self.keyword)):
            for j in range(len(self.keyword)):
                if i != j and self.keyword[i]==self.keyword[j]:
                    print("Invalid Key")
                    print("key has repeated characters")
                    return

        # create blocks (strings) with similar length as our keyword and store them in our blockstore
        # make sure each block will have the same length.
        # for example, if the key word length is 4 and the plaintext has 18 characters,
        #           we add two 'a' characters to create 5 blocks of length 4
        if len(self.plaintext) % self.block_len != 0:
            temp = self.block_len - (len(self.plaintext) % self.block_len)
            self.plaintext += ('a' * temp)

        # create blocks and store them in self.blockstore
        block_counter = 0
        self.block_store = []
        while block_counter < (len(self.plaintext)):
            block = self.plaintext[block_counter:block_counter + self.block_len]
            # print(block)
            # print(block, block_counter)
            self.block_store.append(block)
            block_counter += self.block_len

        # generate order from key word
        # for example, if keyword is 'abcd', our order is '1234'.
        # If keyword is 'maine', order is '41352'
        order = self.key_order_generator()
        temp_list = [None] * self.block_len
        for char in order:
            val = int(char) - 1
            text = ''
            i = 0
            while i < len(self.plaintext) // self.block_len:
                curr_block = self.block_store[i]
                text += curr_block[val]
                i += 1
            temp_list[val] = text
        new_list = [None] * self.block_len
        for i in range(len(order)):
            j = int(order[i]) - 1
            new_list[j] = temp_list[i]
        # print(temp_list)
        # print(new_list)
        self.ciphertext = ''.join(new_list)
        return self.ciphertext

    def decrypt(self, ciphertext='', keyword='abcd'):
        if self.keyword != keyword and keyword != 'abcd':
            self.keyword = keyword
            self.block_len = len(self.keyword)
        if self.ciphertext != ciphertext and ciphertext != '':
            self.ciphertext = ciphertext

        # The key doesn't work if len(ciphertext) is not a multiple of len(keyword)
        if len(self.ciphertext) % len(self.keyword) != 0:
            print('Key does not match ciphertext')
            return

        # Our key shouldn't have repeated characters.
        # for example 'kill' is an invalid key because 'l' is repeated
        for i in range(len(self.keyword)):
            for j in range(len(self.keyword)):
                if i != j and self.keyword[i] == self.keyword[j]:
                    print("Invalid Key")
                    print("key has repeated characters")
                    return

        # store ciphertext in blocks inside blockstore
        block_counter = 0
        self.block_store = []
        # the number of blocks we will have is equal to len(keyword)
        # the length of each block we use for decryption
        # is different from the length we use for encryption.
        # It is equal to the number of blocks we would have had if we were encrypting with this key.
        b = len(self.ciphertext) // self.block_len  # b is equal to the length of each block
        while block_counter < (len(self.ciphertext)):
            block = self.ciphertext[block_counter:int(block_counter + b)]
            self.block_store.append(block)
            block_counter += b

        # generate new order for decryption and decrypt
        order = self.key_order_generator()
        temp_list = []  # temporary list to store re-ordered self.block_store
        for char in order:
            val = int(char) - 1
            text = ''
            i = 0
            while i < b:  # b is the length of each block
                curr_block = self.block_store[val]
                text += curr_block[i]
                i += 1
            temp_list.append(text)
        # print(temp_list)

        # take elements from each string in textfile and arrange them
        self.plaintext = ''
        for i in range(b):
            chars = ''
            for text in temp_list:
                chars += text[i]
            self.plaintext += chars
        return self.plaintext


#below is the trial for the transposition encryption and decryption
trans = Transposition()
print("the transposition encrypted value is: ",trans.encrypt('at four surveillance on enemy camp and attack', 'caine'))
print("the transposition decrypted value is: ",trans.decrypt('tsicnadcarenecnauvanyatafuleemakorlompta'))

print("-------------------------------------")


class RSA:
    def calculating_gcf(self, a, b):  # a recursive function to find the gcf of two functions.
        if (b == 0):
            return a
        else:
            return self.calculating_gcf(b, a % b)

    def modinverse(self, a, m):  # a function to find the mod inverse of two numbers
        for x in range(1, m):
            if (((a % m) * (x % m)) % m == 1):
                return x
        return -1
    def genereating_keypairs(self, p, q):  # choosing two prime numbers p and q
        N = p * q
        T = ((p - 1) * (q - 1))
        # we generate a random number 'e' which must be less than the value of T
        # and this number sould be coprime with the value of N and T.
        e = random.randrange(1, T)
        value = self.calculating_gcf(e, T)
        # we should check for the coprime charactersic of the numbers 'e' and 'T'
        while value != 1:
            e = random.randrange(1, T)
            value = self.calculating_gcf(e, T)
        d = self.modinverse(e, T)
        publickey = (e, N)
        privatekey = (d, N)
        return (publickey, privatekey)

    def encrypt(self, publickey, plaintext):
        (key, N) = publickey
        result = ""
        for i in plaintext:
            ciphertext = (ord(i) ** key) % N
            result = result + str(ciphertext) + " "
        return result

    def decrypt(self, privatekey, ciphertext):
        x = ciphertext.split()
        key, N = privatekey
        plaintext = [chr((int(i) ** key) % N) for i in x]
        return ''.join(plaintext)

test = RSA()
#by using the function 'generating_keypairs' we can generate public key and private keys and we can use those keys to decrypt and encrypt
# the given texts. for example we can take p=23 and q=7 because they are primes in the first hand and we can take them as a parameter for
# the 'generating_keypairs' function to generate the needed key pairs. for example taking p=23 and q=7 gives the keypairs(41,161) and
# (29,161). so we can use the first order pair as an encryption key and the second key as a decryption key.


#below is the trial for RSA encryption and decryption
print(test.genereating_keypairs(107,113))
print("the RSA encrypted value is: ",test.encrypt((2257, 12091), "stops"))
print("the RSA decrypted value is: ",test.decrypt((2609, 12091), "5416 5345 6336 6779 5416"))

# print(test.decrypt(19))

