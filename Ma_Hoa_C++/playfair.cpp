// playfair.cpp
// Biên dịch: g++ playfair.cpp -o playfair
#include <bits/stdc++.h>
using namespace std;

string prepare_key(const string &key){
    vector<bool> used(26,false);
    used['J' - 'A'] = true; // merge J->I
    string seq;
    for(char ch: key){
        if (!isalpha((unsigned char)ch)) continue;
        char c = toupper((unsigned char)ch);
        if (c == 'J') c = 'I';
        if (!used[c - 'A']) { used[c - 'A'] = true; seq.push_back(c); }
    }
    for(char c='A'; c<='Z'; ++c){
        if (c == 'J') continue;
        if (!used[c - 'A']) { used[c - 'A'] = true; seq.push_back(c); }
    }
    return seq; // length 25
}

void build_square(const string &key, char square[5][5]){
    string seq = prepare_key(key);
    int p=0;
    for(int r=0;r<5;++r) for(int c=0;c<5;++c) square[r][c] = seq[p++];
}

pair<int,int> findPos(char square[5][5], char ch){
    if (ch == 'J') ch = 'I';
    for (int r=0;r<5;++r) for (int c=0;c<5;++c) if (square[r][c] == ch) return {r,c};
    return {-1,-1};
}

string prepare_text(const string &raw){
    string s;
    for(char ch: raw) if(isalpha((unsigned char)ch)) s.push_back(toupper((unsigned char)ch));
    for(char &c: s) if(c=='J') c='I';
    string out;
    for(size_t i=0;i<s.size();){
        char a = s[i];
        char b = (i+1<s.size()? s[i+1] : 0);
        if (!b) { out.push_back(a); out.push_back('X'); i++; }
        else if (a == b) { out.push_back(a); out.push_back('X'); i++; }
        else { out.push_back(a); out.push_back(b); i+=2; }
    }
    return out;
}

string playfair_encrypt(const string &raw, const string &key){
    char square[5][5];
    build_square(key, square);
    string s = prepare_text(raw);
    string out;
    for (size_t i=0;i<s.size(); i+=2){
        char A = s[i], B = s[i+1];
        auto pa = findPos(square, A);
        auto pb = findPos(square, B);
        if (pa.first == pb.first){ // same row
            out.push_back(square[pa.first][ (pa.second+1)%5 ]);
            out.push_back(square[pb.first][ (pb.second+1)%5 ]);
        } else if (pa.second == pb.second){ // same col
            out.push_back(square[(pa.first+1)%5][pa.second]);
            out.push_back(square[(pb.first+1)%5][pb.second]);
        } else {
            out.push_back(square[pa.first][pb.second]);
            out.push_back(square[pb.first][pa.second]);
        }
    }
    return out;
}

string playfair_decrypt(const string &raw, const string &key){
    char square[5][5];
    build_square(key, square);
    string s; for(char ch: raw) if(isalpha((unsigned char)ch)) s.push_back(toupper((unsigned char)ch));
    string out;
    for (size_t i=0;i<s.size(); i+=2){
        char A = s[i], B = s[i+1];
        auto pa = findPos(square, A);
        auto pb = findPos(square, B);
        if (pa.first == pb.first){ // same row
            out.push_back(square[pa.first][ (pa.second+4)%5 ]);
            out.push_back(square[pb.first][ (pb.second+4)%5 ]);
        } else if (pa.second == pb.second){ // same col
            out.push_back(square[(pa.first+4)%5][pa.second]);
            out.push_back(square[(pb.first+4)%5][pb.second]);
        } else {
            out.push_back(square[pa.first][pb.second]);
            out.push_back(square[pb.first][pa.second]);
        }
    }
    return out;
}

int main(){
    string key, text;
    cout<<"Nhap key: "; getline(cin, key);
    cout<<"Nhap van ban: "; getline(cin, text);
    cout<<"Ma hoa: "<<playfair_encrypt(text, key)<<"\n";
    string enc = playfair_encrypt(text, key);
    cout<<"Giai ma: "<<playfair_decrypt(enc, key)<<"\n";
    return 0;
}
