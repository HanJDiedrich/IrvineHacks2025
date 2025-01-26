import mysql.connector     # For connecting to SQL database
import json
from flask import Flask, jsonify
# Database Configuration
CONFIG = {
    'host' : 'localhost',
    'user' : 'gameUser',
    'password' : 'password',
    'database' : 'connectiondb'
}

class MySQLManager():
    def __init__(self):
        try:
            # Attempt to establish a connection
            self.connection = mysql.connector.connect(**CONFIG)
            self.cursor = self.connection.cursor()
        except mysql.connector.Error:
            print("Connection unsuccessful.")
    
    def get_games(self):
        self.cursor.execute("SELECT name, creatorName, category, dateCreated FROM games ORDER BY dateCreated DESC")
        games = self.cursor.fetchall()
        return jsonify(games)
    
    def get_games_category(self, category):
        query = f"SELECT name, creatorName, category, dateCreated FROM games WHERE category = '{category}' ORDER BY dateCreated DESC"
        self.cursor.execute(query)
        games = self.cursor.fetchall()
        return jsonify(games)
    
    def get_game_data(self, gameId):
        pass

    
    def insert_new_game(self, gameName, public, creatorName, category, groups, wordsPerGroup, gameData, gameLink):
        # insert into games
        insert_query = """
            INSERT INTO games (name, public, groupCount, wordsPerGroup, category, creatorName, gameLink)
            VALUES (%s,%s,%s,%s,%s,%s,%s)
            """      
        self.cursor.execute(insert_query, (gameName, public, groups, wordsPerGroup, category, creatorName, gameLink))
        self.connection.commit()
        game_id = self.cursor.lastrowid
        # insert into game data
        insert_game_data_query = """
            INSERT INTO game_data (gameId, data)
            VALUES (%s, %s)
            """
        self.cursor.execute(insert_game_data_query, (game_id, json.dumps(gameData)))
        self.connection.commit()

       

        ''' 
         # Get category name
        self.cursor.execute(f"SELECT id FROM categories WHERE name = '{[category]}'")
        categoryId = self.cursor.fetchall()
        # Insert into game_categories
        insert_game_category_query = """
            INSERT INTO game_categories (categoryId, gameId)
            VALUES (%s, %s)
            self.cursor.execute(insert_game_category_query, (categoryId, game_id))
        self.connection.commit()
        """'''
       
        

    # Read commands from an SQL file
    def _execute_sql_commands(self, filepath):
        try: 
            with open(filepath, 'r') as sql_file:
                sql_commands = sql_file.read()

            for command in sql_commands.split(';'):
                if command.strip():
                    self.cursor.execute(command)
            
            self.connection.commit()
            
        except mysql.connector.Error as e:
            print(f"Command execution error: {e}.")


   # Execute write commands from python 
    def _execute_write(self, query : str):
        with self.connection.cursor() as cursor:
            try:
                cursor.execute(query)
            except mysql.connector.Error as e:
                print(f"Write error: {e}")
            else:
                self.connection.commit()
                print("Write successful.")


    # Execute read commands from python
    def _execute_read(self, query):
        with self.connection.cursor(buffered=True) as cursor:
            try:
                cursor.execute(query)
            except mysql.connector.Error as e:
                print(f"Read error: {e}")
            else:
                self.connection.commit()
                return cursor.fetchall()


if __name__ == '__main__':
    manager = MySQLManager()
    #print(manager.search_games_categories('Math'))

    #sql_filepath = "sampleData.sql"
    #manager._execute_sql_commands(sql_filepath)