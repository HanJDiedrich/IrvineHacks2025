import mysql.connector     # For connecting to SQL database

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
    
    # Search games by category
    def search_games_categories(self, category):
        query = f"SELECT g.name, g.gameLink FROM games g JOIN game_categories gc ON g.id = gc.gameId JOIN categories c ON c.id = gc.categoryId WHERE c.name = '{category}';"
        self.cursor.execute(query)
        results = self.cursor.fetchall()
        return results
    
    # def upload_game_data(self):
    #     # Json data needed for upload
    #     data = request.json
    #     name = data['name']
    #     public = data['public']
    #     rowX = data['rowX']
    #     rowY = data['rowY']
    #     creatorName = data['creatorName']
    #     gameLink = data['gameLink']
    #     gameData = data['gameData']

        
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
    print(manager.search_games_categories('Math'))

    #sql_filepath = "sampleData.sql"
    #manager._execute_sql_commands(sql_filepath)