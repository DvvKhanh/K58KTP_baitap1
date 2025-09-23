#include <iostream>
#include <string>
#include <cctype>
using namespace std;

string caesar(const string &s, int k) {
    string out; out.reserve(s.size());
    k = (k % 26 + 26) % 26;
    for (unsigned char ch : s) {
        if (isupper(ch)) out.push_back(char('A' + (ch - 'A' + k) % 26));
        else if (islower(ch)) out.push_back(char('a' + (ch - 'a' + k) % 26));
        else out.push_back(ch);
    }
    return out;
}

int main() {
    string plain, keyline;
    cout << "Nhap ban ro: ";
    getline(cin, plain);
    cout << "Nhap khoa k: ";
    getline(cin, keyline);
    int k = 0;
    try { k = stoi(keyline); } catch (...) { cerr << "Khoa khong hop le. Mac dinh k=0\n"; }
    string cipher = caesar(plain, k);
    cout << "Ban ma: " << cipher << '\n';
    cout << "Giai ma: " << caesar(cipher, -k) << '\n';
    return 0;
}
