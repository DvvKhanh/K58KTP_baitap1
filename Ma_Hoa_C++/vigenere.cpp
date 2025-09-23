// vigenere.cpp
// Biên dịch: g++ vigenere.cpp -o vigenere
#include <bits/stdc++.h>
using namespace std;

string vigenere_encrypt(const string &plain, const string &key){
    string out;
    int j = 0, m = key.size();
    for(char ch: plain){
        if (isalpha((unsigned char)ch)){
            char base = isupper((unsigned char)ch)? 'A' : 'a';
            int pi = ch - base;
            int ki = tolower(key[j % m]) - 'a';
            out.push_back(char(base + (pi + ki) % 26));
            j++;
        } else out.push_back(ch);
    }
    return out;
}

string vigenere_decrypt(const string &cipher, const string &key){
    string out;
    int j = 0, m = key.size();
    for(char ch: cipher){
        if (isalpha((unsigned char)ch)){
            char base = isupper((unsigned char)ch)? 'A' : 'a';
            int ci = ch - base;
            int ki = tolower(key[j % m]) - 'a';
            out.push_back(char(base + (ci - ki + 26) % 26));
            j++;
        } else out.push_back(ch);
    }
    return out;
}

int main(){
    string text,key;
    cout<<"Nhap van ban: "; getline(cin, text);
    cout<<"Nhap khoa: "; getline(cin, key);
    string enc = vigenere_encrypt(text,key);
    cout<<"Ma hoa: "<<enc<<"\n";
    cout<<"Giai ma: "<<vigenere_decrypt(enc,key)<<"\n";
    return 0;
}
