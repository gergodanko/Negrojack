
        var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        var deck = new Array();
        var players = new Array();
        var currentPlayer = 0;
        var first = true;
        function createDeck()
        {
            deck = new Array();
            for (var i = 0 ; i < values.length; i++)
            {
                for(var x = 0; x < suits.length; x++)
                {
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;
                    var card = { Value: values[i], Suit: suits[x], Weight: weight };
                    deck.push(card);
                }
            }
        }

        function createPlayers(num)
        {
            players = new Array();
            for(var i = 1; i <= num; i++)
            {
                var hand = new Array();
                var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
                players.push(player);
            }
        }

        function createPlayersUI()
        {
            document.getElementById('players').innerHTML = '';
            for(var i = 0; i < players.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'player';
                div_hand.id = 'hand_' + i;

                div_playerid.innerHTML = 'Player ' + players[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('players').appendChild(div_player);
            }
        }
        function atLeastTwoAces()
        {
            for(var i = 0; i < players.length; i++)
            {
                if(players[i].Points > 21)
                {
                   window.open("https://www.w3schools.com");
                   
                }
            }
          
        }
        function shuffle()
        {
            
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }
        function removeButton(id) 
        {
            var elem = document.getElementById(id);
            if(id == "Player_btn")
            {
                document.getElementById('AI_btn').value = 'Restart';
            }
            else
            {
                document.getElementById('Player_btn').value = 'Restart';
            }
            elem.parentNode.removeChild(elem);
            return false;
        }
        function startblackjack()
        {
            first = true;
            document.getElementById('changebtn').value = 'Draw for Player1';
            document.getElementById("changebtn").style.visibility = "visible";


            document.getElementById("staybtn").style.visibility = "visible";
            document.getElementById("deck").style.visibility = "visible";
            document.getElementById("status").style.display="none";
            document.getElementById('changebtn').disabled = false;
            document.getElementById('staybtn').disabled = false;
            
            currentPlayer = 0;
            createDeck();
            shuffle();
            createPlayers(2);
            createPlayersUI();
            dealHands();
            document.getElementById('player_' + currentPlayer).classList.add('active');
            atLeastTwoAces();
            isThisTwentyOne();
            check();
        }

        function isThisTwentyOne()
        {
            for(var i = 0; i < players.length; i++)
            {
                if(players[i].Points == 21)
                {
                    if(i==1)
                    {
                        first=false;
                    }
                    end();
                }
            }
            
        }

        function end()
        {
            
            document.getElementById('changebtn').disabled = true;
            document.getElementById('staybtn').disabled = true;
            
            if (players[0].Points > players[1].Points && players[0].Points<21)
            {
                document.getElementById('status').innerHTML = 'Winner: Player 1';
                document.getElementById("status").style.display = "inline-block";
            }
            else if(players[0].Points < players[1].Points &&players[1].Points<21)
            {
                document.getElementById('status').innerHTML = 'Winner: Player 2';
                document.getElementById("status").style.display = "inline-block";
            }

            else if(players[0].Points == players[1].Points)
            {
                document.getElementById('status').innerHTML = 'Draw';
                document.getElementById("status").style.display = "inline-block";
            }

            else
            {

                if(first==true)
                {
                    document.getElementById('status').innerHTML = 'Winner: Player 1';
                    document.getElementById("status").style.display = "inline-block";
                }
                else if(first==false)
                {
                    document.getElementById('status').innerHTML = 'Winner: Player 2';
                    document.getElementById("status").style.display = "inline-block";
                }
            }
        }
        function dealHands()
        {
           
            for(var i = 0; i < 2; i++)
            {
                for (var x = 0; x < players.length; x++)
                {
                    var card = deck.pop();
                    players[x].Hand.push(card);
                    renderCard(card, x);
                    updatePoints();
                }
            }
            
            updateDeck();
        }

        function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(getCardUI(card));
        }

        function getCardUI(card)
        {
            var el = document.createElement('div');
            var icon = '';
            if (card.Suit == 'Hearts')
            icon='&hearts;';
            else if (card.Suit == 'Spades')
            icon = '&spades;';
            else if (card.Suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';
            
            el.className = 'card';
            el.innerHTML = card.Value + '<br/>' + icon;
            return el;
        }
        function isThisHigher()
        {
            if(players[1].Points>players[0].Points)
            {
                end();
            }
        }
        
        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < players[player].Hand.length; i++)
            {
                points += players[player].Hand[i].Weight;
            }
            players[player].Points = points;
            return points;
        }

        function updatePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

        function hitMe()
        {
            
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();
            atLeastTwoAces();
            updateDeck();
            check();
            isThisTwentyOne();
        }

        function stay()
        {

            document.getElementById('changebtn').value = 'Draw for Player2';
            isThisHigher();
           
            if (currentPlayer != players.length-1) {
                document.getElementById('player_' + currentPlayer).classList.remove('active');
                currentPlayer += 1;
                document.getElementById('player_' + currentPlayer).classList.add('active');
            }
            
            else {
                end();

            }
        }


        function check()
        {
            if (players[currentPlayer].Points > 21)
            {
                
                if (currentPlayer==0)
                {
                    first=false;
                }
                else
                {
                    first=true;
                }
                end();
            }
            else if(players[1].Points>21)
            {
                end();
            }
        }

        function updateDeck()
        {
            document.getElementById('deckcount').innerHTML = deck.length;
        }

        window.addEventListener('load', function(){
            createDeck();
            shuffle();
            createPlayers(1);
        });
        //Ha a játékos1-nek kevesebb értékű lapjai vannak húzás után, mint a 
        //játékos2-nek, automatikusan a játékos2 nyer

        //Bot