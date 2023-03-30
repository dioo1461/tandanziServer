import * as bcrypt from 'bcrypt';
 // commonjs, es module과의 차이점(commonjs에는 default가 없다)으로 인해 *를 써줘야함

const rounds = 10;

export const EncryptPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, rounds);
}

export const DecryptPassword = async(crypted: string): Promise<any> => {
    

}

export const ComparePassword = async(password:string, cryptedOrigin:string):Promise<boolean> => {
    return await bcrypt.compare(password, cryptedOrigin);
}