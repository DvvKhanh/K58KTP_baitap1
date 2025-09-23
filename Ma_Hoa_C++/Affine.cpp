// affine.cpp
// Biên dịch: g++ affine.cpp -o affine
#include <bits/stdc++.h>
using namespace std;

int modInv(int a, int m) {
    a = (a % m + m) % m;
    for (int x=1;x<m;++x) if ((a*x) % m == 1) return x;
    return -1;
}

string affine_encrypt(const string &s, int a, int b){
    string out = s;
    for (size_t i=0;i<out.size();++i){
        char c = out[i];
        if (isupper((unsigned char)c)){
            int x = c - 'A';
            out[i] = char('A' + (a*x + b) % 26);
        } else if (islower((unsigned char)c)){
            int x = c - 'a';
            out[i] = char('a' + (a*x + b) % 26);
        }
    }
    return out;
}

string affine_decrypt(const string &s, int a, int b){
    int a_inv = modInv(a,26);
    if (a_inv == -1) return string("ERROR: a has no inverse mod26");
    string out = s;
    for (size_t i=0;i<out.size();++i){
        char c = out[i];
        if (isupper((unsigned char)c)){
            int y = c - 'A';
            out[i] = char('A' + (a_inv * ((y - b + 26) % 26)) % 26);
        } else if (islower((unsigned char)c)){
            int y = c - 'a';
            out[i] = char('a' + (a_inv * ((y - b + 26) % 26)) % 26);
        }
    }
    return out;
}

int main(){
    string text; cout<<"Nhap van ban: "; getline(cin, text);
    int a,b; cout<<"Nhap a b: "; cin>>a>>b;
    cout<<"Ma hoa: "<<affine_encrypt(text,a,b)<<"\n";
    cout<<"Giai ma: "<<affine_decrypt(affine_encrypt(text,a,b), a, b)<<"\n";
    return 0;
}
